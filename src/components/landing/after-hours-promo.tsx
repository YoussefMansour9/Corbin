import Link from 'next/link';
import { ArrowRight, PhoneCall } from 'lucide-react';
import { Button } from '@/components/ui/button';

const highlights = [
  'Answer calls with your greeting',
  'Capture and qualify new leads',
  'Schedule appointments in your system',
  'Update your CRM and follow up',
];

export function AfterHoursPromo() {
  return (
    <section className="border-y bg-muted/40 py-16 md:py-24">
      <div className="container">
        <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-bold uppercase tracking-wide text-primary">
              <PhoneCall className="h-4 w-4" aria-hidden="true" />
              After-Hours Coverage
            </span>
            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
              Never Miss a Customer Call After Hours
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Your customers don't stop calling when your office closes. Get a dedicated remote team member
              covering evenings, nights and weekends, starting at $7/hour.
            </p>

            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <Button asChild size="lg" className="h-12 px-8 text-base">
                <Link href="/after-hours">
                  See How It Works
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-8 text-base">
                <Link href="/book-a-consult">Book a Free Consultation</Link>
              </Button>
            </div>
          </div>

          <ul className="grid gap-3">
            {highlights.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 rounded-xl border bg-card px-5 py-4 shadow-sm"
              >
                <span className="h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                <span className="font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
