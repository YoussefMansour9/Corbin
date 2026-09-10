import { LocationsSection } from '@/components/landing/locations-section';
import { JsonLd, breadcrumbSchema, graph } from '@/components/seo/json-ld';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Our Locations',
  description:
    'Tour the managed office spaces our remote professionals work from, rather than unknown freelancers working from uncontrolled locations.',
  path: '/locations',
});

export default function LocationsPage() {
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Our Locations', path: '/locations' },
          ])
        )}
      />
      <LocationsSection />
    </>
  );
}
