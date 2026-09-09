'use client';

import { useEffect, useRef } from 'react';

const CALENDLY_URL = 'https://calendly.com/dei-corbinstaffing/30min?month=2026-09';

export function CalendlyEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear any existing content
    container.innerHTML = '';

    // Create the Calendly inline embed
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.onload = () => {
      if ((window as any).Calendly) {
        (window as any).Calendly.initInlineWidget({
          url: CALENDLY_URL,
          parentElement: container,
          prefill: {},
          utm: {}
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup: destroy the widget if possible
      if ((window as any).Calendly && (window as any).Calendly.destroy) {
        (window as any).Calendly.destroy();
      }
      // Remove the script
      const existingScript = document.querySelector('script[src*="calendly.com/assets/external/widget.js"]');
      if (existingScript) existingScript.remove();
    };
  }, []);

  return (
    <section id="calendly-booking" className="py-16 md:py-24">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center">Book a 15-Minute Call</h2>
        <p className="max-w-2xl mx-auto text-center text-lg text-muted-foreground mt-4">
          Pick a time that works for you. We&apos;ll discuss your staffing needs and how Corbin can help.
        </p>
        <div 
          ref={containerRef} 
          className="mt-8 max-w-2xl mx-auto"
          style={{ minHeight: '600px' }}
        />
        <p className="text-center text-sm text-muted-foreground mt-6">
          Having trouble? <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="text-primary underline hover:no-underline">
            Open Calendly in a new tab
          </a>
        </p>
      </div>
    </section>
  );
}