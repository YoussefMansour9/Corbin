import Link from 'next/link';
import {
  ArrowRight,
  CalendarClock,
  ClipboardList,
  Database,
  FileText,
  Headset,
  PhoneCall,
  PhoneForwarded,
  UserCheck,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageHero } from '@/components/shared/page-hero';
import { ClosingCta } from '@/components/shared/closing-cta';
import { JsonLd, breadcrumbSchema, graph, serviceSchema } from '@/components/seo/json-ld';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'After-Hours Call Coverage',
  description:
    'Dedicated after-hours call coverage starting at $7/hour. Corbin remote team members answer your calls, capture leads and schedule appointments when your office is closed.',
  path: '/after-hours',
});

const capabilities = [
  {
    icon: PhoneCall,
    title: 'Inbound Call Answering',
    description: "Answer incoming calls professionally using your company's greeting and procedures.",
  },
  {
    icon: UserCheck,
    title: 'Lead Capture',
    description: 'Collect customer information, understand what they need, and document the opportunity.',
  },
  {
    icon: CalendarClock,
    title: 'Appointment Scheduling',
    description: 'Schedule qualified customers directly into your calendar or scheduling system.',
  },
  {
    icon: Database,
    title: 'CRM Updates',
    description: 'Enter call information, customer details, notes, and follow-up tasks into your CRM.',
  },
  {
    icon: PhoneForwarded,
    title: 'Customer Follow-Up',
    description: 'Follow up with leads and customers who still need assistance.',
  },
  {
    icon: Headset,
    title: 'Outbound Calling',
    description:
      'Use available time for lead follow-up, appointment confirmations, customer outreach, and other outbound campaigns.',
  },
  {
    icon: ClipboardList,
    title: 'Administrative Support',
    description:
      'When call volume is lower, your Corbin employee can assist with data entry, emails, CRM cleanup, scheduling, and other administrative work.',
  },
];

const downtimeTasks = [
  'Answer Calls',
  'Follow Up With Leads',
  'Schedule Appointments',
  'Update Your CRM',
  'Perform Outbound Calls',
  'Handle Admin Work',
];

const scheduleOptions = [
  'Evenings',
  'Nights',
  'Weekends',
  'Overflow Calls',
  'Extended Business Hours',
];

const trainingItems = [
  'Your company greeting',
  'Services you offer',
  'Frequently asked questions',
  'Lead qualification questions',
  'Appointment scheduling procedures',
  'Call escalation rules',
  'CRM and software',
  'Emergency-call procedures',
  'Customer follow-up process',
];

const steps = [
  {
    number: '1',
    title: 'Tell Us What You Need',
    description:
      "We'll learn about your business, call volume, schedule, software, and what you'd like handled after hours.",
  },
  {
    number: '2',
    title: 'Meet Your Candidates',
    description: "Corbin recruits and vets candidates based on the position you're looking to fill.",
  },
  {
    number: '3',
    title: 'Train Your Team Member',
    description:
      'Your selected team member learns your systems, call procedures, and customer-service expectations.',
  },
  {
    number: '4',
    title: 'Start Taking Calls',
    description:
      "Your Corbin team member begins covering your designated hours and handling the additional tasks you've assigned.",
  },
];

const targetIndustries = [
  'Home Services',
  'Property Management',
  'Real Estate',
  'Professional Services',
  'Restaurants',
  'Transportation',
  'Customer Service Operations',
  'Insurance',
  'Other Service Businesses',
];

/** A single lane of the without/with Corbin flow diagram. */
function FlowLane({
  label,
  steps,
  tone,
}: {
  label: string;
  steps: string[];
  tone: 'negative' | 'positive';
}) {
  const isNegative = tone === 'negative';

  return (
    <div
      className={`rounded-2xl border-2 p-6 md:p-8 ${
        isNegative ? 'border-destructive/25 bg-destructive/5' : 'border-primary/25 bg-primary/5'
      }`}
    >
      <h3 className={`text-lg font-bold ${isNegative ? 'text-destructive' : 'text-primary'}`}>{label}</h3>
      <ol className="mt-5 flex flex-col gap-3">
        {steps.map((step, index) => (
          <li key={step} className="flex items-center gap-3">
            <span
              className={`flex-1 rounded-xl border bg-background px-4 py-3 text-sm font-semibold shadow-sm ${
                isNegative ? 'text-foreground/80' : 'text-foreground'
              }`}
            >
              {step}
            </span>
            {index < steps.length - 1 && (
              <ArrowRight
                className={`h-4 w-4 shrink-0 rotate-90 ${isNegative ? 'text-destructive/60' : 'text-primary/60'}`}
                aria-hidden="true"
              />
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function AfterHoursPage() {
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'After-Hours Call Coverage', path: '/after-hours' },
          ]),
          {
            ...serviceSchema({
              name: 'After-Hours Call Coverage',
              description:
                'Dedicated remote team members who answer inbound calls after hours, capture leads, schedule appointments and update your CRM.',
              path: '/after-hours',
              serviceType: 'Answering Service',
            }),
            offers: [
              {
                '@type': 'Offer',
                name: 'Part-Time Coverage',
                description: '20 hours per week of dedicated after-hours coverage.',
                price: '560',
                priceCurrency: 'USD',
                priceSpecification: {
                  '@type': 'UnitPriceSpecification',
                  price: '560',
                  priceCurrency: 'USD',
                  unitCode: 'MON',
                },
              },
              {
                '@type': 'Offer',
                name: 'Full-Time Coverage',
                description: '40 hours per week of dedicated after-hours coverage.',
                price: '1120',
                priceCurrency: 'USD',
                priceSpecification: {
                  '@type': 'UnitPriceSpecification',
                  price: '1120',
                  priceCurrency: 'USD',
                  unitCode: 'MON',
                },
              },
            ],
          },
          {
            '@type': 'HowTo',
            name: 'How Corbin after-hours coverage works',
            step: steps.map((step, index) => ({
              '@type': 'HowToStep',
              position: index + 1,
              name: step.title,
              text: step.description,
            })),
          }
        )}
      />

      <PageHero
        eyebrow="After-Hours Call Coverage"
        headline="Never Miss a Customer Call After Hours"
        subheadline="Dedicated after-hours call coverage starting at just $7/hour."
        body="Your customers don't stop calling when your office closes. Corbin Staffing provides dedicated remote team members who answer your calls after hours, capture new leads, schedule appointments, and make sure potential business doesn't disappear because nobody picked up the phone."
        meta="Starting at $7/hour · Part-Time Coverage From $560/Month"
        primaryCta={{ href: '/contact', label: 'Get After-Hours Coverage' }}
        secondaryCta={{ href: '/book-a-consult', label: 'Book a Free Consultation' }}
      />

      {/* Problem / solution flow */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Every Missed Call Could Be a Missed Job
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">A potential customer calls after hours.</p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
            <FlowLane
              label="Without Corbin"
              tone="negative"
              steps={['Nobody Answers', 'They Call Your Competitor', 'You Lose the Job']}
            />
            <FlowLane
              label="With Corbin"
              tone="positive"
              steps={[
                'Customer Calls',
                'Corbin Answers',
                'Lead Captured',
                'Appointment Scheduled',
                'Your Team Follows Up',
              ]}
            />
          </div>

          <p className="mt-10 text-center text-lg font-medium italic text-muted-foreground">
            Keep your business available even when your local office isn't.
          </p>
        </div>
      </section>

      {/* More than answering the phone */}
      <section className="border-y bg-muted/40 py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              More Than Just Answering the Phone
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Your dedicated Corbin team member can handle:
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((item) => (
              <Card
                key={item.title}
                className="flex h-full flex-col rounded-2xl border-primary/15 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <CardHeader className="pb-3">
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-lg font-bold">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Downtime */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Turn Downtime Into Productive Time
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              You're not just paying someone to sit around waiting for the phone to ring. During slower
              periods, your Corbin team member can work on other tasks for your business.
            </p>
          </div>

          <ul className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {downtimeTasks.map((task) => (
              <li
                key={task}
                className="flex items-center gap-3 rounded-xl border bg-card px-5 py-4 shadow-sm"
              >
                <span className="h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                <span className="font-medium">{task}</span>
              </li>
            ))}
          </ul>

          <p className="mt-10 text-center text-lg font-medium italic text-muted-foreground">
            One remote team member. Multiple ways to support your business.
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section className="border-y bg-muted/40 py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Starting at $7/Hour</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              After-Hours Coverage Without After-Hours Labor Costs
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Hiring additional local staff just to cover nights, evenings, or weekends can get expensive.
              Corbin gives businesses another option.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
            {[
              { name: 'Part-Time', hours: '20 Hours/Week', price: '560', popular: false },
              { name: 'Full-Time', hours: '40 Hours/Week', price: '1,120', popular: true },
            ].map((plan) => (
              <Card
                key={plan.name}
                className={`flex flex-col rounded-2xl text-center shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                  plan.popular ? 'border-2 border-primary' : 'border-primary/20'
                }`}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <p className="text-sm font-medium text-muted-foreground">{plan.hours}</p>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col justify-between gap-6 pt-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Starting at</p>
                    <p className="mt-1">
                      <span className="text-5xl font-extrabold">${plan.price}</span>
                      <span className="text-muted-foreground">/month</span>
                    </p>
                  </div>
                  <Button asChild size="lg" className="w-full">
                    <Link href="/book-a-consult">Book a Free Consultation</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground">
            Pricing may vary based on position requirements, experience, schedule, and responsibilities.
          </p>
        </div>
      </section>

      {/* Scheduling flexibility */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">We Work Around Your Business</h2>
            <p className="mt-4 text-lg text-muted-foreground">Choose the coverage your company needs.</p>
          </div>

          <ul className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-3">
            {scheduleOptions.map((option) => (
              <li
                key={option}
                className="rounded-full border-2 border-primary/20 bg-card px-5 py-2.5 text-sm font-semibold shadow-sm"
              >
                {option}
              </li>
            ))}
          </ul>

          <p className="mx-auto mt-8 max-w-2xl text-center text-lg text-muted-foreground">
            Whether you need a few additional hours of coverage or a dedicated full-time team member, we'll
            help build a schedule around your operation.
          </p>
          <p className="mt-6 text-center text-lg font-medium italic text-muted-foreground">
            Your Business, Answered Your Way
          </p>
        </div>
      </section>

      {/* Training / customization */}
      <section className="border-y bg-muted/40 py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Trained Around Your Business</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Your Corbin team member can be trained around your business, including:
            </p>
          </div>

          <ul className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {trainingItems.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border bg-card p-4 shadow-sm"
              >
                <FileText className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <span className="text-sm font-medium leading-snug">{item}</span>
              </li>
            ))}
          </ul>

          <p className="mt-10 text-center text-lg font-medium italic text-muted-foreground">
            To your customer, they're calling your business.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">How It Works</h2>

          <ol className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <li
                key={step.number}
                className="flex h-full flex-col rounded-2xl border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  {step.number}
                </span>
                <h3 className="mt-4 text-lg font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Target industries */}
      <section className="border-t bg-muted/40 py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Built for Businesses That Can't Afford to Miss Calls
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              After-hours coverage can be especially valuable for:
            </p>
          </div>

          <ul className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-3">
            {targetIndustries.map((item) => (
              <li
                key={item}
                className="rounded-full border bg-background px-4 py-2 text-sm font-medium shadow-sm"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ClosingCta
        headline="Stop Letting Missed Calls Become Missed Business"
        body="Your next customer could be calling tonight. Get dedicated after-hours call coverage starting at just $7/hour."
        ctaLabel="Book a Free Consultation"
        secondaryCta={{ href: '/contact', label: 'Ready to Hire' }}
      />
    </>
  );
}
