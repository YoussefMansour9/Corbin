import { ContactSection } from '@/components/landing/contact-section';
import { JsonLd, breadcrumbSchema, graph } from '@/components/seo/json-ld';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Ready to Hire',
  description:
    'Send us the details of the role you are hiring for and we will start recruiting pre-vetted remote candidates built around it. We reply within 24 hours.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Ready to Hire', path: '/contact' },
          ])
        )}
      />
      <ContactSection />
    </>
  );
}
