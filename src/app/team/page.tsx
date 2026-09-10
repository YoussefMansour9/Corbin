import { TeamSection } from '@/components/landing/team-section';
import { JsonLd, breadcrumbSchema, graph } from '@/components/seo/json-ld';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Our Team',
  description:
    'Meet the leadership team behind Corbin Staffing, across Florida, New Jersey, New York, Egypt and the Philippines.',
  path: '/team',
});

export default function TeamPage() {
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Our Team', path: '/team' },
          ])
        )}
      />
      <TeamSection />
    </>
  );
}
