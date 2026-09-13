'use client';

import { getAttribution } from '@/lib/leads/attribution';
import type { ConsultInput, HireInput, VerticalInput } from '@/lib/leads/schema';

type LeadPayload =
  | { formType: 'consult'; data: ConsultInput }
  | { formType: 'hire'; data: HireInput }
  | { formType: 'vertical'; data: VerticalInput };

/**
 * Why a submission failed. Distinguishing these matters: a rate limit needs a
 * different message from an outage, and an outage needs a way for the visitor
 * to still reach us.
 */
export type SubmitFailure =
  | 'offline'
  | 'network'
  | 'timeout'
  | 'rate_limited'
  | 'invalid'
  | 'unavailable'
  | 'server'
  | 'unknown';

export type SaveLeadResult =
  | { ok: true; id: string | null }
  | { ok: false; reason: SubmitFailure; status?: number };

const TIMEOUT_MS = 15000;

/**
 * Posts a lead to our own API route, which revalidates it server-side and
 * writes it to the database.
 *
 * Never throws. The caller decides what to show, and every failure carries a
 * reason so the message can be specific rather than "something went wrong".
 */
export async function saveLead(
  payload: LeadPayload,
  meta: { companyWebsite: string; elapsedMs: number }
): Promise<SaveLeadResult> {
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    return { ok: false, reason: 'offline' };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

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
      signal: controller.signal,
    });

    if (response.ok) {
      const result = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        id?: string | null;
      };
      if (result.ok) return { ok: true, id: result.id ?? null };
      return { ok: false, reason: 'unknown', status: response.status };
    }

    const reason: SubmitFailure =
      response.status === 429
        ? 'rate_limited'
        : response.status === 400
          ? 'invalid'
          : response.status === 503
            ? 'unavailable'
            : response.status >= 500
              ? 'server'
              : 'unknown';

    return { ok: false, reason, status: response.status };
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      return { ok: false, reason: 'timeout' };
    }
    return { ok: false, reason: 'network' };
  } finally {
    clearTimeout(timer);
  }
}
