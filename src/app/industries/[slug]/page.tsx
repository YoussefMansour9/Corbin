import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check } from 'lucide-react';
import { getIndustry, industries } from '@/lib/industries-data';
import { IndustryIcon } from '@/components/industries/industry-icon';
import { PageHero } from '@/components/shared/page-hero';
import { ClosingCta } from '@/components/shared/closing-cta';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { JsonLd, breadcrumbSchema, graph, serviceSchema } from '@/components/seo/json-ld';
import { pageMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};

  return pageMetadata({
    title: `${industry.name} Staffing`,
    description: `${industry.blurb} Popular roles include ${industry.popularRoles.slice(0, 3).join(', ')}.`,
    path: `/industries/${industry.slug}`,
  });
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  const otherIndustries = industries.filter((item) => item.slug !== industry.slug);

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Industries', path: '/industries' },
            { name: industry.name, path: `/industries/${industry.slug}` },
          ]),
          serviceSchema({
            name: `${industry.name} Remote Staffing`,
            description: industry.blurb,
            path: `/industries/${industry.slug}`,
            serviceType: 'Staffing',
          }),
          {
            '@type': 'ItemList',
            name: `Popular ${industry.name} roles`,
            itemListElement: industry.popularRoles.map((role, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: role,
            })),
          }
        )}
      />

      <PageHero
        eyebrow="Industries"
        headline={`${industry.name} Staffing`}
        body={industry.blurb}
        primaryCta={{ href: '/book-a-consult', label: 'Book a Free Consultation' }}
        secondaryCta={{ href: '/contact', label: 'Ready to Hire' }}
      />

      {/* Popular roles */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">Popular Roles</h2>
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {industry.popularRoles.map((role) => (
                <div
                  key={role}
                  className="flex items-start gap-3 rounded-xl border bg-card p-4 shadow-sm transition-shadow hover:shadow-md"
                >
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <span className="text-sm font-medium leading-snug">{role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sub-industries, currently only Home Services */}
      {industry.subIndustries && (
        <section className="border-y bg-muted/40 py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {industry.name} We Support
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Every trade runs a little differently. Here is what a Corbin team member handles in yours.
              </p>
            </div>

            <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {industry.subIndustries.map((sub) => (
                <Card
                  key={sub.slug}
                  id={sub.slug}
                  className="flex h-full flex-col rounded-2xl border-primary/15 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl font-bold">{sub.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-sm leading-relaxed text-muted-foreground">{sub.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Cross-links */}
      <section className="py-16 md:py-20">
        <div className="container">
          <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
            Other Industries We Staff
          </h2>
          <ul className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-3">
            {otherIndustries.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/industries/${item.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm font-medium transition-colors hover:border-primary/50 hover:text-primary"
                >
                  <IndustryIcon name={item.icon} className="h-4 w-4 text-primary" />
                  {item.name}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ClosingCta
        headline={`Ready to Add ${industry.name} Support?`}
        body="Tell us about the position and we will start recruiting candidates built around your business."
        ctaLabel="Book a Free Consultation"
        secondaryCta={{ href: '/after-hours', label: 'See After-Hours Coverage' }}
      />
    </>
  );
}
