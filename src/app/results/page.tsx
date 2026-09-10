import { Quote, RefreshCcw, ShieldCheck, TrendingDown, UserCheck, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageHero } from '@/components/shared/page-hero';
import { ClosingCta } from '@/components/shared/closing-cta';
import { JsonLd, breadcrumbSchema, graph } from '@/components/seo/json-ld';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Results',
  description:
    'What businesses get from a Corbin remote team: lower overhead, pre-vetted staff, faster hiring and a free replacement guarantee.',
  path: '/results',
});

/**
 * Client case studies.
 * Add entries here once approved copy and permission are in hand.
 * While this list is empty the page renders an "in progress" placeholder
 * rather than fabricated numbers.
 */
const caseStudies: { company: string; industry: string; quote: string; person: string }[] = [];

const outcomes = [
  {
    icon: TrendingDown,
    title: 'Lower Operating Costs',
    description:
      'Dedicated remote staff start at $7/hour, without the payroll taxes, benefits, equipment and office space a local hire carries.',
  },
  {
    icon: UserCheck,
    title: 'Pre-Vetted From Day One',
    description:
      'Every candidate is skill-tested, interviewed and background-checked before you meet them, so you are not screening applicants yourself.',
  },
  {
    icon: Zap,
    title: 'Faster Time to Hire',
    description:
      'Skip weeks of sourcing and trial-and-error. We build a candidate pool around your requirements and you review them on your schedule.',
  },
  {
    icon: RefreshCcw,
    title: 'Free Replacement Guarantee',
    description:
      'If someone is not the right fit, we replace them at no extra cost. No downtime, no restarting the hiring process.',
  },
  {
    icon: ShieldCheck,
    title: 'Managed Payroll & Compliance',
    description:
      'We handle payroll, HR administration and local compliance so your team stays focused on the business.',
  },
  {
    icon: Quote,
    title: 'Coverage That Does Not Stop',
    description:
      'U.S. hours, after-hours, nights and weekends. Your business stays reachable even when your local office is closed.',
  },
];

const scenarios = [
  {
    label: 'One local hire',
    detail:
      'Base salary, payroll taxes, benefits, equipment, workspace, recruiting fees and management time.',
    tone: 'negative' as const,
  },
  {
    label: 'One Corbin team member',
    detail:
      'A flat hourly rate starting at $7/hour. Recruiting, vetting, payroll, HR and replacement are included.',
    tone: 'positive' as const,
  },
];

export default function ResultsPage() {
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Results', path: '/results' },
          ])
        )}
      />

      <PageHero
        eyebrow="Results"
        headline="What a Corbin Team Actually Changes"
        body="Businesses come to Corbin to cut overhead without cutting coverage. Here is what that looks like in practice."
        primaryCta={{ href: '/book-a-consult', label: 'Book a Free Consultation' }}
        secondaryCta={{ href: '/pricing', label: 'View Pricing' }}
      />

      {/* Outcomes */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            The Outcomes Clients Hire Us For
          </h2>

          <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {outcomes.map((item) => (
              <Card
                key={item.title}
                className="flex h-full flex-col rounded-2xl border-primary/15 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <CardHeader className="pb-3">
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-lg font-bold leading-snug">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cost framing */}
      <section className="border-y bg-muted/40 py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Where the Savings Come From</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              The hourly rate is only part of it. Compare what each option actually includes.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
            {scenarios.map((scenario) => (
              <div
                key={scenario.label}
                className={`rounded-2xl border-2 p-8 ${
                  scenario.tone === 'negative'
                    ? 'border-destructive/25 bg-destructive/5'
                    : 'border-primary/25 bg-primary/5'
                }`}
              >
                <h3
                  className={`text-xl font-bold ${
                    scenario.tone === 'negative' ? 'text-destructive' : 'text-primary'
                  }`}
                >
                  {scenario.label}
                </h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">{scenario.detail}</p>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground">
            Pricing may vary based on position requirements, experience, schedule, and responsibilities.
          </p>
        </div>
      </section>

      {/* Case studies */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">Client Stories</h2>

          {caseStudies.length > 0 ? (
            <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {caseStudies.map((study) => (
                <Card key={study.company} className="flex h-full flex-col rounded-2xl shadow-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-bold">{study.company}</CardTitle>
                    <p className="text-sm font-medium text-primary">{study.industry}</p>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="leading-relaxed text-muted-foreground">{study.quote}</p>
                    <p className="mt-4 text-sm font-semibold">{study.person}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="mx-auto mt-12 max-w-2xl rounded-2xl border-2 border-dashed bg-muted/40 p-10 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Quote className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-xl font-bold">Client Stories Coming Soon</h3>
              <p className="mt-3 text-muted-foreground">
                We are collecting approved write-ups from current clients. Want to talk to a reference in your
                industry? Ask us on your consultation call and we will arrange it.
              </p>
            </div>
          )}
        </div>
      </section>

      <ClosingCta
        headline="See What This Would Look Like for Your Business"
        body="Book a free consultation and we will scope the role, the schedule and the cost against what you are paying today."
        ctaLabel="Book a Free Consultation"
        secondaryCta={{ href: '/contact', label: 'Ready to Hire' }}
      />
    </>
  );
}
