import Link from 'next/link';
import { ArrowRight, CalendarClock, MessageSquare, PhoneCall, PhoneForwarded, Voicemail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageHero } from '@/components/shared/page-hero';
import { ClosingCta } from '@/components/shared/closing-cta';
import { JsonLd, breadcrumbSchema, graph, serviceSchema } from '@/components/seo/json-ld';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Call Coverage',
  description:
    'Dedicated after-hours and inbound call coverage starting at $7/hour. Corbin answers your calls, takes messages and captures appointment requests when your office is closed.',
  path: '/after-hours',
});

/**
 * Deliberately limited to what the $7 product actually does. Outbound
 * campaigns, CRM updates, data entry, email work and general administrative
 * support belong to the $8 Standard VA, and mixing them in here is what made
 * the two tiers indistinguishable.
 */
const handled = [
  { icon: PhoneCall, label: 'After-hours calls' },
  { icon: PhoneForwarded, label: 'Inbound calls' },
  { icon: Voicemail, label: 'Message taking' },
  { icon: MessageSquare, label: 'Call routing' },
  { icon: CalendarClock, label: 'Appointment requests' },
];

const whyItMatters = [
  'Stay available after closing.',
  'Capture more inquiries.',
  'Give customers a real person to reach.',
];

const coverage = ['Evenings', 'Nights', 'Weekends', 'Overflow calls', 'Extended hours'];

const flow = ['Customer Calls', 'Corbin Answers', 'Message / Request Captured', 'Your Team Follows Up'];

export default function AfterHoursPage() {
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Call Coverage', path: '/after-hours' },
          ]),
          {
            ...serviceSchema({
              name: 'After-Hours Call Coverage',
              description:
                'Dedicated remote team members who answer after-hours and inbound calls, take messages, route callers and capture appointment requests.',
              path: '/after-hours',
              serviceType: 'Answering Service',
            }),
            offers: {
              '@type': 'Offer',
              name: 'Part-Time Call Coverage',
              description: '20 hours per week of dedicated call coverage.',
              price: '560',
              priceCurrency: 'USD',
              priceSpecification: {
                '@type': 'UnitPriceSpecification',
                price: '560',
                priceCurrency: 'USD',
                unitCode: 'MON',
              },
            },
          }
        )}
      />

      <PageHero
        eyebrow="Call Coverage"
        headline="Never Miss a Customer Call After Hours"
        body="Dedicated after-hours and inbound call coverage starting at $7/hour."
        primaryCta={{ href: '/book-a-consult', label: 'Get Call Coverage' }}
        secondaryCta={{ href: '/pricing', label: 'Compare Plans' }}
      />

      {/* What they handle, why it matters, coverage */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-3">
            <Card className="rounded-2xl border-primary/15 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-bold">What They Handle</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {handled.map((item) => (
                    <li key={item.label} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                      <span className="font-medium">{item.label}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-primary/15 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-bold">Why It Matters</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {whyItMatters.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-primary/15 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-bold">Flexible Coverage</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="flex flex-wrap gap-2">
                  {coverage.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border bg-muted/50 px-3 py-1.5 text-sm font-medium"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Simple flow */}
      <section className="border-y bg-muted/40 py-16 md:py-20">
        <div className="container">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">How a Call Goes</h2>
          <ol className="mx-auto mt-10 flex max-w-5xl flex-col items-stretch gap-3 lg:flex-row lg:items-center">
            {flow.map((step, index) => (
              <li key={step} className="flex items-center gap-3 lg:contents">
                <span className="flex-1 rounded-xl border-2 border-primary/20 bg-card px-5 py-4 text-center text-sm font-semibold shadow-sm lg:flex-1">
                  {step}
                </span>
                {index < flow.length - 1 && (
                  <ArrowRight
                    className="h-5 w-5 shrink-0 rotate-90 text-primary lg:rotate-0"
                    aria-hidden="true"
                  />
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Pricing, and the boundary with the Standard VA */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Simple Pricing</h2>
            <p className="mt-6">
              <span className="text-6xl font-extrabold">$7</span>
              <span className="text-xl text-muted-foreground">/hour</span>
            </p>
            <p className="mt-3 text-lg font-medium text-muted-foreground">
              Part-time from $560/month
            </p>

            <div className="mt-8 flex justify-center">
              <Button asChild size="lg" className="h-12 px-8 text-base">
                <Link href="/book-a-consult">Book a Free Consultation</Link>
              </Button>
            </div>
          </div>

          <div className="mx-auto mt-12 max-w-3xl rounded-2xl border bg-muted/40 p-6 text-center">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Need CRM updates, outbound calling, email or general admin work as well? That is the{' '}
              <Link href="/pricing" className="font-semibold text-primary hover:underline">
                Standard VA at $8/hour
              </Link>
              , which covers everything here plus day to day operational support.
            </p>
          </div>
        </div>
      </section>

      <ClosingCta
        headline="Stop Letting Missed Calls Become Missed Business"
        body="Your next customer could be calling tonight. Get dedicated call coverage starting at $7/hour."
        ctaLabel="Book a Free Consultation"
        secondaryCta={{ href: '/pricing', label: 'See All Plans' }}
      />
    </>
  );
}
