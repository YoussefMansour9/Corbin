import { PricingSection } from '@/components/landing/pricing-section';
import { JsonLd, breadcrumbSchema, graph, serviceSchema } from '@/components/seo/json-ld';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Pricing',
  description:
    'Build your team for less. Call coverage from $7/hour, standard VA support from $8/hour, and specialized talent from $11/hour, with no recruiting or payroll fees.',
  path: '/pricing',
});

export default function PricingPage() {
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Pricing', path: '/pricing' },
          ]),
          {
            ...serviceSchema({
              name: 'Remote Staffing Plans',
              description:
                'Dedicated remote employees for U.S. businesses, billed hourly with recruiting, payroll and HR administration included.',
              path: '/pricing',
              serviceType: 'Staffing',
            }),
            offers: {
              '@type': 'AggregateOffer',
              priceCurrency: 'USD',
              lowPrice: '7',
              highPrice: '11',
              unitText: 'HOUR',
              offerCount: 3,
            },
          }
        )}
      />
      <PricingSection />
    </>
  );
}
