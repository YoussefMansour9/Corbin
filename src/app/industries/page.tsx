import { industries } from '@/lib/industries-data';
import { IndustryCard } from '@/components/industries/industry-card';
import { PageHero } from '@/components/shared/page-hero';
import { ClosingCta } from '@/components/shared/closing-cta';
import { JsonLd, breadcrumbSchema, graph } from '@/components/seo/json-ld';
import { absoluteUrl, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Industries We Staff',
  description:
    'Pre-vetted remote staff for home services, back office, real estate, design and engineering, customer service, IT, professional services, insurance and restaurants.',
  path: '/industries',
});

export default function IndustriesPage() {
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Industries', path: '/industries' },
          ]),
          {
            '@type': 'ItemList',
            name: 'Industries staffed by Corbin Staffing',
            itemListElement: industries.map((industry, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: industry.name,
              url: absoluteUrl(`/industries/${industry.slug}`),
            })),
          }
        )}
      />

      <PageHero
        eyebrow="Industries"
        headline="Remote Staff Built Around Your Industry"
        body="Pick your industry to see the roles we fill, the tasks they cover, and the software they already know."
        primaryCta={{ href: '/book-a-consult', label: 'Book a Free Consultation' }}
        secondaryCta={{ href: '/pricing', label: 'View Pricing' }}
      />

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => (
              <IndustryCard key={industry.slug} industry={industry} />
            ))}
          </div>
        </div>
      </section>

      <ClosingCta
        headline="Not Sure Which Role You Need?"
        body="Tell us what is slowing your team down. We will help you scope the position and show you the candidates who fit."
        ctaLabel="Book a Free Consultation"
        secondaryCta={{ href: '/contact', label: 'Ready to Hire' }}
      />
    </>
  );
}
