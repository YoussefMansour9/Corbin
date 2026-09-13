import { NextResponse } from 'next/server';
import { leadRequestSchema, toLeadRow } from '@/lib/leads/schema';
import { getSupabase, isSupabaseConfigured, missingSupabaseVars } from '@/lib/leads/supabase';
import { getClientIp, hashIp } from '@/lib/leads/request-meta';
import { notifyNewLead } from '@/lib/leads/notify';

// Always run this fresh; nothing here is cacheable.
export const dynamic = 'force-dynamic';

/** A submission faster than this was almost certainly not typed by a person. */
const MIN_ELAPSED_MS = 2500;
/** Successful submissions allowed from one address per hour. */
const MAX_PER_HOUR = 5;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  // Bot checks run against the raw body, before validation. A schema error
  // would name the honeypot field in its response and give the trap away.
  // Both respond with a plain success so a bot learns nothing and does not
  // retry with the field cleared.
  const raw = body as Record<string, unknown> | null;
  if (raw && typeof raw.companyWebsite === 'string' && raw.companyWebsite.length > 0) {
    return NextResponse.json({ ok: true, id: null });
  }
  if (raw && typeof raw.elapsedMs === 'number' && raw.elapsedMs < MIN_ELAPSED_MS) {
    return NextResponse.json({ ok: true, id: null });
  }

  const parsed = leadRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'invalid_payload', issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const lead = parsed.data;

  if (!isSupabaseConfigured()) {
    // Name the missing variables in the server log. A redeploy is required
    // after adding them on Vercel; the dashboard showing a variable does not
    // mean the already-built deployment can read it.
    console.error(
      '[leads] refusing to accept a lead: missing env var(s):',
      missingSupabaseVars().join(', '),
      '| a redeploy is required after adding them'
    );
    return NextResponse.json({ ok: false, error: 'not_configured' }, { status: 503 });
  }

  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ ok: false, error: 'not_configured' }, { status: 503 });
  }

  const ipHash = hashIp(getClientIp(request.headers));

  // Rate limit from the leads table itself, so there is no second table to
  // keep in sync. Counts successful submissions from this address this hour.
  if (ipHash) {
    const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count, error } = await supabase
      .from('leads')
      .select('id', { count: 'exact', head: true })
      .eq('ip_hash', ipHash)
      .gte('created_at', since);

    if (!error && (count ?? 0) >= MAX_PER_HOUR) {
      return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 });
    }
  }

  const row = {
    ...toLeadRow(lead),
    ip_hash: ipHash,
    user_agent: request.headers.get('user-agent')?.slice(0, 500) ?? null,
  };

  const { data, error } = await supabase.from('leads').insert(row).select('id').single();

  if (error) {
    console.error('[leads] insert failed', error.message);
    return NextResponse.json({ ok: false, error: 'insert_failed' }, { status: 500 });
  }

  // The lead is stored, so from here nothing can lose it. The notification is
  // best effort, and its outcome is recorded on the row so a silent mail
  // failure stays visible and can be retried from the dashboard.
  const notified = await notifyNewLead(row, data.id);

  const { error: updateError } = await supabase
    .from('leads')
    .update({
      email_sent: notified.sent,
      email_error: notified.sent ? null : notified.error ?? 'unknown',
    })
    .eq('id', data.id);

  if (updateError) {
    console.error('[leads] could not record notification status', updateError.message);
  }
  if (!notified.sent) {
    console.error('[leads] notification failed for', data.id, notified.error);
  }

  return NextResponse.json({ ok: true, id: data.id, emailed: notified.sent });
}
