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
