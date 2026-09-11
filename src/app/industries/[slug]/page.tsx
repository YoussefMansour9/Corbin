import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check } from 'lucide-react';
import { getIndustry, industries } from '@/lib/industries-data';
import { IndustryIcon } from '@/components/industries/industry-icon';
import { PageHero } from '@/components/shared/page-hero';
import { ClosingCta } from '@/components/shared/closing-cta';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
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
    description: `${industry.heroLine} Popular roles include ${industry.popularRoles
      .slice(0, 3)
      .join(', ')}.`,
    path: `/industries/${industry.slug}`,
  });
}

/** One column of short labels. Used for roles, tasks and software alike. */
function LabelColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h2 className="text-xs font-bold uppercase tracking-wider text-primary">{title}</h2>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            <span className="text-sm leading-snug">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
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
            description: industry.heroLine,
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
        headline={`Remote Staffing for ${industry.name}`}
        body={industry.heroLine}
        primaryCta={{ href: '/book-a-consult', label: 'Book a Consultation' }}
      />

      {/* Roles, tasks and software: the three things a prospect checks. */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 rounded-2xl border bg-card p-8 shadow-sm md:grid-cols-3 md:gap-8">
            <LabelColumn title="Popular Roles" items={industry.popularRoles} />
            <LabelColumn title="Common Tasks" items={industry.commonTasks} />
            <LabelColumn title="Common Software" items={industry.commonSoftware} />
          </div>
        </div>
      </section>

      {/* How Corbin helps */}
      <section className="border-y bg-muted/40 py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How Corbin Helps</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Corbin recruits and vets dedicated remote staff around the exact role, schedule, and
              software your business needs.
            </p>
          </div>

          {/* Long descriptions sit behind expandable cards, per the guide. */}
          {industry.subIndustries && (
            <div className="mx-auto mt-10 max-w-3xl">
              <Accordion type="single" collapsible className="w-full">
                {industry.subIndustries.map((sub) => (
                  <AccordionItem key={sub.slug} value={sub.slug} id={sub.slug}>
                    <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
                      {sub.name}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                      {sub.description}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}
        </div>
      </section>

      {/* Cross-links */}
      <section className="py-14 md:py-16">
        <div className="container">
          <h2 className="text-center text-2xl font-bold tracking-tight">Other Industries We Staff</h2>
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
        headline="Tell Us What You Need"
        body="We'll help you find the right person for the role, the schedule and the software you use."
        ctaLabel="Book a Free Consultation"
      />
    </>
  );
}
