import 'server-only';
import type { LeadRow } from '@/lib/leads/schema';

const RESEND_ENDPOINT = 'https://api.resend.com/emails';

const apiKey = process.env.RESEND_API_KEY || '';
/**
 * Sending from your own domain requires verifying it on Resend (DNS records
 * for SPF and DKIM). Until that is done, fall back to Resend's shared sender,
 * which only delivers to the Resend account owner's address.
 */
const from = process.env.RESEND_FROM || 'Corbin Staffing <onboarding@resend.dev>';
const to = (process.env.LEAD_NOTIFICATION_TO || '')
  .split(',')
  .map((address) => address.trim())
  .filter(Boolean);

export function isNotifyConfigured() {
  return Boolean(apiKey && to.length);
}

const FORM_LABELS: Record<LeadRow['form_type'], string> = {
  consult: 'Consultation request',
  hire: 'Ready to hire',
  vertical: 'Roofing landing page',
};

/** Only render rows that actually have a value. */
function row(label: string, value: string | null | undefined) {
  if (!value) return '';
  const safe = String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  return `<tr>
    <td style="padding:6px 16px 6px 0;color:#64748b;font-size:13px;vertical-align:top;white-space:nowrap">${label}</td>
    <td style="padding:6px 0;color:#0f172a;font-size:14px">${safe}</td>
  </tr>`;
}

function buildHtml(lead: LeadRow, id: string) {
  const source = [lead.utm_source, lead.utm_medium, lead.utm_campaign].filter(Boolean).join(' / ');

  return `<div style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;background:#f8fafc;padding:24px">
  <div style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden">
    <div style="background:#2563eb;padding:16px 24px">
      <p style="margin:0;color:#fff;font-size:12px;letter-spacing:.14em;text-transform:uppercase;font-weight:700">
        ${FORM_LABELS[lead.form_type]}
      </p>
      <p style="margin:4px 0 0;color:#fff;font-size:20px;font-weight:700">
        ${lead.name}${lead.company ? ` &middot; ${lead.company}` : ''}
      </p>
    </div>
    <div style="padding:20px 24px">
      <table style="border-collapse:collapse;width:100%">
        ${row('Email', lead.email)}
        ${row('Phone', lead.phone)}
        ${row('Company', lead.company)}
        ${row('Role needed', lead.position_needed)}
        ${row('Job title', lead.job_title)}
        ${row('Job description', lead.job_description)}
        ${row('Software', lead.essential_programs)}
        ${row('Hours', lead.job_hours)}
        ${row('Workplace', lead.workplace_preference)}
        ${row('Website', lead.business_website)}
        ${row('Referral', lead.referral)}
        ${row('Heard about us', lead.how_did_you_hear)}
        ${row('Notes', lead.additional_info)}
      </table>
    </div>
    <div style="padding:14px 24px;border-top:1px solid #e2e8f0;background:#f8fafc">
      <table style="border-collapse:collapse;width:100%">
        ${row('Campaign', source)}
        ${row('Referrer', lead.referrer)}
        ${row('Landed on', lead.landing_path)}
        ${row('Submitted from', lead.page_path)}
      </table>
      <p style="margin:12px 0 0;color:#94a3b8;font-size:12px">
        Saved to the leads table as ${id}. This email is a notification only; the lead is stored either way.
      </p>
    </div>
  </div>
</div>`;
}

function buildText(lead: LeadRow, id: string) {
  const lines = [
    `${FORM_LABELS[lead.form_type]}`,
    `${lead.name}${lead.company ? ` (${lead.company})` : ''}`,
    '',
    lead.email ? `Email: ${lead.email}` : '',
    lead.phone ? `Phone: ${lead.phone}` : '',
    lead.position_needed ? `Role needed: ${lead.position_needed}` : '',
    lead.job_title ? `Job title: ${lead.job_title}` : '',
    lead.job_description ? `Description: ${lead.job_description}` : '',
    lead.job_hours ? `Hours: ${lead.job_hours}` : '',
    '',
    `Lead id: ${id}`,
  ];
  return lines.filter(Boolean).join('\n');
}

export interface NotifyResult {
  sent: boolean;
  error?: string;
}

/**
 * Sends the notification. Never throws: the lead is already stored, so a mail
 * failure must not fail the request. The reason is returned so the caller can
 * record it against the row and the failure stays visible.
 */
export async function notifyNewLead(lead: LeadRow, id: string): Promise<NotifyResult> {
  if (!isNotifyConfigured()) {
    return { sent: false, error: 'notify_not_configured' };
  }

  const subject = `${FORM_LABELS[lead.form_type]}: ${lead.name}${lead.company ? ` (${lead.company})` : ''}`;

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to,
        subject,
        html: buildHtml(lead, id),
        text: buildText(lead, id),
        // Replies go straight to the prospect where we have an address.
        ...(lead.email ? { reply_to: lead.email } : {}),
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      return { sent: false, error: `resend_${response.status}: ${body.slice(0, 300)}` };
    }
    return { sent: true };
  } catch (error) {
    return { sent: false, error: `resend_exception: ${String(error).slice(0, 300)}` };
  }
}
