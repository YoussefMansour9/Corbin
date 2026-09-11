import { ArrowRight, FileLock2, KeyRound, LockKeyhole, ShieldCheck, UserMinus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageHero } from '@/components/shared/page-hero';
import { ClosingCta } from '@/components/shared/closing-cta';
import { JsonLd, breadcrumbSchema, graph } from '@/components/seo/json-ld';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Security & Compliance',
  description:
    'Your business, your data, protected. How Corbin Staffing handles vetting, confidentiality, controlled system access, password practices and offboarding for remote team members.',
  path: '/security',
});

const pillars = [
  {
    icon: ShieldCheck,
    title: 'Vetting',
    description:
      "Candidates go through Corbin's screening and vetting process before being presented to clients. Background checks can be incorporated based on the position and client requirements.",
  },
  {
    icon: FileLock2,
    title: 'Confidentiality',
    description:
      'Corbin team members are required to follow confidentiality obligations designed to protect client information, internal processes, customer data, and other sensitive business information. Client-specific NDAs and confidentiality requirements can also be incorporated when needed.',
  },
  {
    icon: LockKeyhole,
    title: 'Access Controls',
    description:
      'We encourage clients to follow the principle of least privilege, giving each team member access only to the systems and information necessary to perform their job. Access can be adjusted or removed as responsibilities change.',
  },
  {
    icon: KeyRound,
    title: 'Secure Practices',
    description:
      "Businesses should never need to freely share master passwords with remote employees. We support business password managers, individual user accounts, multi-factor authentication, and role-based permissions wherever the client's systems allow. Corbin professionals also work from a managed office rather than uncontrolled locations.",
  },
  {
    icon: UserMinus,
    title: 'Offboarding',
    description:
      'When an employee leaves a position, Corbin works with the client to ensure an organized transition. Clients are encouraged to immediately revoke system access, disable individual accounts, rotate shared credentials where necessary, and recover or secure company information.',
  },
];

const clientRequirements = [
  'CRM and customer-data access',
  'Email and communication platforms',
  'Financial and accounting systems',
  'File and document access',
  'Password management',
  'Multi-factor authentication',
  'Confidentiality agreements',
  'Device and workplace requirements',
];

const lifecycle = ['Vetted Talent', 'Controlled Access', 'Ongoing Oversight', 'Secure Offboarding'];

export default function SecurityPage() {
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Security & Compliance', path: '/security' },
          ])
        )}
      />

      <PageHero
        eyebrow="Security & Compliance"
        headline="Security & Compliance"
        subheadline="Your Business. Your Data. Protected."
        body="When you bring a remote team member into your business, trust matters. At Corbin Staffing, we take security, confidentiality, and responsible access seriously. Our processes are designed to help protect your company, your customers, and your information throughout the employment lifecycle."
        primaryCta={{ href: '/book-a-consult', label: 'Book a Security & Staffing Consultation' }}
      />

      {/* Approach */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Our Approach to Security
          </h2>

          <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pillars.map((pillar) => (
              <Card
                key={pillar.title}
                className="flex h-full flex-col rounded-2xl border-primary/15 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <CardHeader className="pb-3">
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <pillar.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-lg font-bold leading-snug">{pillar.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm leading-relaxed text-muted-foreground">{pillar.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Client-specific requirements */}
      <section className="border-y bg-muted/40 py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Client-Specific Security Requirements
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Every business is different. Corbin can work with clients to establish security procedures
              appropriate for the employee's responsibilities, including requirements related to:
            </p>
          </div>

          <ul className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {clientRequirements.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border bg-card p-4 shadow-sm"
              >
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <span className="text-sm font-medium leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Lifecycle */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Security Starts Before Day One</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Our goal is to help clients build remote teams without sacrificing the controls they expect
              from their internal workforce.
            </p>
          </div>

          <ol className="mx-auto mt-12 flex max-w-5xl flex-col items-stretch gap-3 md:flex-row md:items-center md:justify-center">
            {lifecycle.map((stage, index) => (
              <li key={stage} className="flex items-center gap-3 md:contents">
                <span className="flex-1 rounded-xl border-2 border-primary/20 bg-card px-5 py-4 text-center text-sm font-semibold shadow-sm md:flex-none">
                  {stage}
                </span>
                {index < lifecycle.length - 1 && (
                  <ArrowRight
                    className="h-5 w-5 shrink-0 rotate-90 text-primary md:rotate-0"
                    aria-hidden="true"
                  />
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ClosingCta
        headline="Have Specific Security Requirements?"
        body="Tell us about your company's systems, policies, or compliance requirements. Our team can discuss how Corbin can structure a remote staffing arrangement around your organization's needs."
        ctaLabel="Book a Security & Staffing Consultation"
      />
    </>
  );
}
