'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';

const CALENDLY_URL = 'https://calendly.com/dei-corbinstaffing/30min';
const WIDGET_SCRIPT = 'https://assets.calendly.com/assets/external/widget.js';
const WIDGET_STYLES = 'https://assets.calendly.com/assets/external/widget.css';

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
        prefill?: Record<string, unknown>;
        utm?: Record<string, unknown>;
      }) => void;
    };
  }
}

/**
 * Module-level promise so the widget script is fetched exactly once per page
 * load, no matter how many embeds mount or how often effects re-run.
 */
let scriptPromise: Promise<void> | null = null;

function loadCalendlyWidget(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.Calendly) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise<void>((resolve, reject) => {
    if (!document.querySelector(`link[data-calendly-styles]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = WIDGET_STYLES;
      link.dataset.calendlyStyles = 'true';
      document.head.appendChild(link);
    }

    const existing = document.querySelector<HTMLScriptElement>(`script[src="${WIDGET_SCRIPT}"]`);
    if (existing) {
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () => reject(new Error('Calendly failed to load')));
      return;
    }

    const script = document.createElement('script');
    script.src = WIDGET_SCRIPT;
    script.async = true;
    script.addEventListener('load', () => resolve());
    script.addEventListener('error', () => {
      scriptPromise = null;
      reject(new Error('Calendly failed to load'));
    });
    document.body.appendChild(script);
  });

  return scriptPromise;
}

interface CalendlyEmbedProps {
  headline?: string;
  description?: string;
  /** Set false when the surrounding page already provides a heading. */
  showHeading?: boolean;
  className?: string;
}

export function CalendlyEmbed({
  headline = 'Book a Time That Works for You',
  description = "Pick a slot below and we'll discuss your staffing needs and how Corbin can help.",
  showHeading = true,
  className,
}: CalendlyEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  // The widget pulls roughly a megabyte of third-party JS and an iframe, so
  // hold off until the section is close to the viewport. On the home page it
  // sits below several screens of content and most visitors never reach it.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '600px 0px' }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !inView) return;

    let cancelled = false;

    loadCalendlyWidget()
      .then(() => {
        if (cancelled || !window.Calendly) return;
        // React strict mode mounts effects twice in development, and a
        // second initInlineWidget call on the same node stacks a duplicate
        // iframe. Bail out if this container already holds a widget.
        if (container.querySelector('iframe')) return;

        container.innerHTML = '';
        window.Calendly.initInlineWidget({
          url: `${CALENDLY_URL}?hide_gdpr_banner=1`,
          parentElement: container,
          prefill: {},
          utm: {},
        });
      })
      .catch(() => {
        // The fallback link below the embed covers a failed script load.
      });

    return () => {
      cancelled = true;
      // initInlineWidget tags the node and injects an iframe. Strip both so a
      // remount starts from a clean container instead of adding a second one.
      container.innerHTML = '';
      container.classList.remove('calendly-inline-widget');
      delete container.dataset.processed;
    };
  }, [inView]);

  return (
    <section id="calendly-booking" className={className ?? 'py-16 md:py-24'}>
      <div className="container">
        {showHeading && (
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{headline}</h2>
            <p className="mt-4 text-lg text-muted-foreground">{description}</p>
          </div>
        )}

        {/* Calendly injects an iframe with height:100%, so the wrapper needs a
            real height. Mobile stacks the date list under the calendar and
            needs noticeably more room than the two-column desktop view. */}
        <div className="mx-auto mt-10 w-full max-w-5xl overflow-hidden rounded-2xl border bg-card shadow-sm">
          <div
            ref={containerRef}
            className="flex h-[1150px] w-full items-center justify-center sm:h-[950px] lg:h-[720px]"
            aria-label="Calendly scheduling calendar"
            aria-busy={!inView}
          >
            {/* Replaced by the widget once it loads; keeps the box from
                looking broken while the iframe is still on its way. */}
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Loading available times…
            </span>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Having trouble?{' '}
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary underline hover:no-underline"
          >
            Open the calendar in a new tab
          </a>
        </p>
      </div>
    </section>
  );
}
