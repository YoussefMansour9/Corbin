const SDK_URL = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';

interface EmailJsSdk {
  init: (key: string) => void;
  send: (
    serviceId: string,
    templateId: string,
    params: Record<string, unknown>
  ) => Promise<unknown>;
}

declare global {
  interface Window {
    emailjs?: EmailJsSdk;
  }
}

/**
 * Module-level promise so the SDK is fetched at most once, on the first
 * submit. Previously this script loaded on every page in the root layout,
 * including the twelve pages that have no form at all.
 */
let sdkPromise: Promise<EmailJsSdk> | null = null;

function loadSdk(): Promise<EmailJsSdk> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('EmailJS is browser only'));
  }
  if (window.emailjs) return Promise.resolve(window.emailjs);
  if (sdkPromise) return sdkPromise;

  sdkPromise = new Promise<EmailJsSdk>((resolve, reject) => {
    const settle = () => {
      if (window.emailjs) resolve(window.emailjs);
      else reject(new Error('EmailJS loaded but did not register'));
    };
    const fail = () => {
      // Let a later submit retry rather than caching the failure forever.
      sdkPromise = null;
      reject(new Error('EmailJS failed to load'));
    };

    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SDK_URL}"]`);
    if (existing) {
      existing.addEventListener('load', settle);
      existing.addEventListener('error', fail);
      return;
    }

    const script = document.createElement('script');
    script.src = SDK_URL;
    script.async = true;
    script.addEventListener('load', settle);
    script.addEventListener('error', fail);
    document.body.appendChild(script);
  });

  return sdkPromise;
}

/** True when the service and public key are configured at build time. */
export function isEmailJsConfigured(templateId: string) {
  return Boolean(SERVICE_ID && PUBLIC_KEY && templateId);
}

/**
 * Loads the SDK if needed, then sends. Throws on a failed load so callers
 * surface an error toast instead of hitting `undefined.send`.
 */
export async function sendEmail(templateId: string, params: Record<string, unknown>) {
  const emailjs = await loadSdk();
  emailjs.init(PUBLIC_KEY);
  return emailjs.send(SERVICE_ID, templateId, params);
}
