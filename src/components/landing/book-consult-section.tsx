import { CalendarCheck, MessageSquareText } from 'lucide-react';
import { BookConsultForm } from '@/components/landing/book-consult-form';
import { CalendlyEmbed } from '@/components/vertical/calendly-embed';
import { PageHero } from '@/components/shared/page-hero';

export function BookConsultSection() {
  return (
    <>
      <PageHero
        eyebrow="Book a Consultation"
        headline="Book a Free Consultation"
        body="Tell us the role you are trying to fill and we will walk you through candidates, pricing and how quickly we can get someone started. No obligation."
      />

      {/* Option 1: pick a time. One calendar, full width, so it never gets squeezed. */}
      <section id="pick-a-time" className="pt-16 md:pt-20">
        <div className="container">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CalendarCheck className="h-6 w-6" aria-hidden="true" />
            </span>
            <p className="mt-4 text-sm font-bold uppercase tracking-[0.2em] text-primary">Option 1</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Pick a Time Right Now</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Choose a slot that works for you and we will send the invite straight to your inbox.
            </p>
          </div>
        </div>
      </section>

      <CalendlyEmbed showHeading={false} className="pb-16 pt-8 md:pb-20" />

      {/* Option 2: short form. */}
      <section id="consult-form" className="border-t bg-muted/40 py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl">
            <div className="flex flex-col items-center text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <MessageSquareText className="h-6 w-6" aria-hidden="true" />
              </span>
              <p className="mt-4 text-sm font-bold uppercase tracking-[0.2em] text-primary">Option 2</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Have Us Reach Out Instead
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Send us the basics and we will follow up to schedule a time that fits.
              </p>
            </div>

            <div className="mt-10">
              <BookConsultForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
