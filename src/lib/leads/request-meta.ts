import 'server-only';
import { createHash } from 'node:crypto';

/**
 * Best-effort client IP. Hosting providers put the real address in
 * x-forwarded-for; the first entry is the client, the rest are proxies.
 */
export function getClientIp(headers: Headers): string | null {
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim();
    if (first) return first;
  }
  return headers.get('x-real-ip') || headers.get('cf-connecting-ip') || null;
}

/**
 * Hash the address rather than storing it. We only ever need to compare it
 * against itself for rate limiting, so the raw value is never required, and
 * not keeping it avoids holding personal data we would have to disclose.
 */
export function hashIp(ip: string | null): string | null {
  if (!ip) return null;
  const salt = process.env.IP_HASH_SALT || 'corbin-staffing';
  return createHash('sha256').update(`${salt}:${ip}`).digest('hex').slice(0, 32);
}
