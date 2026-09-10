import { AboutStory } from '@/components/landing/about-story';
import { JsonLd, breadcrumbSchema, graph } from '@/components/seo/json-ld';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'About Us',
  description:
    "Corbin Staffing grew out of our founders' own e-commerce business, from a three-person team working out of a home in the Philippines to more than 80 people in a newly renovated office.",
  path: '/about',
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'About Us', path: '/about' },
          ])
        )}
      />
      <AboutStory />
    </>
  );
}
