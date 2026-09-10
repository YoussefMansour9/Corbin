import { HowItWorksSection } from '@/components/landing/how-it-works-section';
import { JsonLd, breadcrumbSchema, graph } from '@/components/seo/json-ld';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'How It Works',
  description:
    'Select, interview and hire pre-vetted remote professionals in three steps. See how Corbin Staffing builds and onboards your team.',
  path: '/how-it-works',
});

export default function HowItWorksPage() {
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'How It Works', path: '/how-it-works' },
          ])
        )}
      />
      <HowItWorksSection asPageHeading />
    </>
  );
}
