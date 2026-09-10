'use client';

const STORAGE_KEY = 'corbin-attribution';

export interface Attribution {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  referrer?: string;
  landingPath?: string;
  pagePath?: string;
}

/**
 * Records where this visit came from, once per session. Captured on the first
 * page the visitor lands on, because by the time they reach a form the UTM
 * parameters and the external referrer are long gone from the URL.
 */
export function captureAttribution() {
  if (typeof window === 'undefined') return;
  try {
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const params = new URLSearchParams(window.location.search);
    const get = (key: string) => params.get(key) || undefined;

    const attribution: Attribution = {
      utmSource: get('utm_source'),
      utmMedium: get('utm_medium'),
      utmCampaign: get('utm_campaign'),
      utmTerm: get('utm_term'),
      utmContent: get('utm_content'),
      // Only external referrers are interesting; our own pages are noise.
      referrer: document.referrer && !document.referrer.startsWith(window.location.origin)
        ? document.referrer
        : undefined,
      landingPath: window.location.pathname,
    };

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // Private browsing or blocked storage: attribution is optional.
  }
}

/** Reads the stored attribution and stamps on the page the form was submitted from. */
export function getAttribution(): Attribution {
  const current: Attribution =
    typeof window === 'undefined' ? {} : { pagePath: window.location.pathname };
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) return { ...(JSON.parse(stored) as Attribution), ...current };
  } catch {
    // Ignore and fall through to what we know right now.
  }
  return current;
}
