import type { SubmitFailure } from '@/lib/leads/save-lead';

export const FALLBACK_EMAIL = 'info@corbinstaffing.com';

interface FailureCopy {
  title: string;
  description: string;
  /** Whether to offer the email fallback so the enquiry still reaches us. */
  offerEmail: boolean;
  /** Whether trying again is likely to help. */
  retryable: boolean;
}

/**
 * One message per failure mode. A visitor who has just typed out a job
 * description deserves to know whether to retry, wait, or email instead.
 */
export function failureCopy(reason: SubmitFailure): FailureCopy {
  switch (reason) {
    case 'offline':
      return {
        title: 'You appear to be offline',
        description:
          'Your details are still here. Reconnect and press the button again, nothing has been lost.',
        offerEmail: false,
        retryable: true,
      };
    case 'network':
      return {
        title: "We couldn't reach our server",
        description:
          'This is usually a temporary connection problem. Your details are still here, so you can try again.',
        offerEmail: true,
        retryable: true,
      };
    case 'timeout':
      return {
        title: 'That took longer than expected',
        description:
          'The request timed out before we heard back. Your details are still here, so please try again.',
        offerEmail: true,
        retryable: true,
      };
    case 'rate_limited':
      return {
        title: "You've sent a few requests already",
        description:
          'We limit submissions to a handful per hour. If you need to reach us sooner, email us directly.',
        offerEmail: true,
        retryable: false,
      };
    case 'invalid':
      return {
        title: 'Some details need another look',
        description: 'Please check the highlighted fields and send it again.',
        offerEmail: false,
        retryable: true,
      };
    case 'unavailable':
    case 'server':
      return {
        title: "We couldn't save your request",
        description:
          'Something is wrong on our end, not with anything you entered. Please email us and we will pick this up straight away.',
        offerEmail: true,
        retryable: true,
      };
    default:
      return {
        title: "We couldn't send your request",
        description: 'Your details are still here. Please try again, or email us directly.',
        offerEmail: true,
        retryable: true,
      };
  }
}

/**
 * Builds a mailto containing what the visitor already typed, so a failed
 * submission still reaches Corbin instead of being lost.
 */
export function buildMailtoFallback(subject: string, fields: Record<string, unknown>) {
  const body = Object.entries(fields)
    .filter(([, value]) => value !== undefined && value !== null && String(value).trim() !== '')
    .map(([label, value]) => `${label}: ${String(value)}`)
    .join('\n');

  return `mailto:${FALLBACK_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
