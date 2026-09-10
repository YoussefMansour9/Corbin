'use client';

import { getAttribution } from '@/lib/leads/attribution';
import type { ConsultInput, HireInput, VerticalInput } from '@/lib/leads/schema';

type LeadPayload =
  | { formType: 'consult'; data: ConsultInput }
  | { formType: 'hire'; data: HireInput }
  | { formType: 'vertical'; data: VerticalInput };

export interface SaveLeadResult {
  ok: boolean;
  id?: string | null;
  /** True when the database is not wired up yet, so email is the only record. */
  notConfigured?: boolean;
}

/**
 * Posts a lead to our own API route, which validates it again server-side and
 * writes it to the database.
 *
 * Never throws. A submission must not be lost because this call failed, so the
 * caller checks the result and falls back to the email notification.
 */
export async function saveLead(
  payload: LeadPayload,
  meta: { companyWebsite: string; elapsedMs: number }
): Promise<SaveLeadResult> {
  try {
    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...payload,
        companyWebsite: meta.companyWebsite,
        elapsedMs: meta.elapsedMs,
        attribution: getAttribution(),
      }),
    });

    if (response.status === 503) return { ok: false, notConfigured: true };
    if (!response.ok) return { ok: false };

    const result = (await response.json()) as { ok?: boolean; id?: string | null };
    return { ok: Boolean(result.ok), id: result.id ?? null };
  } catch {
    return { ok: false };
  }
}
