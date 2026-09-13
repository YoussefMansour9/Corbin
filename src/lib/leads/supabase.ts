import 'server-only';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL || '';
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

/**
 * Server-only Supabase client using the service role key.
 *
 * This key bypasses Row Level Security, so it must never reach the browser.
 * The `server-only` import above turns any accidental client import into a
 * build error, and the variables are deliberately not NEXT_PUBLIC_.
 */
let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!url || !serviceKey) return null;
  if (!client) {
    client = createClient(url, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return client;
}

export function isSupabaseConfigured() {
  return Boolean(url && serviceKey);
}

/**
 * Names the variables that are missing, without ever logging their values.
 *
 * Vercel only exposes environment variables to deployments built after the
 * variable was added, so "the variable exists in the dashboard" and "the
 * running function can see it" are different things. This makes that
 * difference visible in the function logs instead of a bare 503.
 */
export function missingSupabaseVars(): string[] {
  const missing: string[] = [];
  if (!url) missing.push('SUPABASE_URL');
  if (!serviceKey) missing.push('SUPABASE_SERVICE_ROLE_KEY');
  return missing;
}
