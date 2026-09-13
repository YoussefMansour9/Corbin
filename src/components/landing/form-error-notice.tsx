'use client';

import { AlertTriangle, Mail, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { failureCopy, FALLBACK_EMAIL } from '@/lib/leads/submit-messages';
import type { SubmitFailure } from '@/lib/leads/save-lead';

interface FormErrorNoticeProps {
  reason: SubmitFailure;
  /** mailto: link carrying what the visitor already typed. */
  mailtoHref: string;
  onRetry: () => void;
  isSubmitting: boolean;
}

/**
 * Inline, persistent error. A toast disappears after a few seconds, which is
 * the wrong pattern for a failure the visitor has to act on, and screen reader
 * users may miss it entirely. role="alert" announces it on appearance.
 */
export function FormErrorNotice({
  reason,
  mailtoHref,
  onRetry,
  isSubmitting,
}: FormErrorNoticeProps) {
  const copy = failureCopy(reason);

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="rounded-xl border-2 border-destructive/30 bg-destructive/5 p-5"
    >
      <div className="flex gap-3">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" aria-hidden="true" />
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-destructive">{copy.title}</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{copy.description}</p>

          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            {copy.retryable && (
              <Button type="button" size="sm" onClick={onRetry} disabled={isSubmitting}>
                <RotateCcw className="mr-2 h-4 w-4" aria-hidden="true" />
                Try again
              </Button>
            )}
            {copy.offerEmail && (
              <Button asChild size="sm" variant="outline">
                <a href={mailtoHref}>
                  <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
                  Email us instead
                </a>
              </Button>
            )}
          </div>

          {copy.offerEmail && (
            <p className="mt-3 text-xs text-muted-foreground">
              That opens your email app with these details already filled in, addressed to{' '}
              {FALLBACK_EMAIL}.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
