import { BookConsultSection } from '@/components/landing/book-consult-section';
import { JsonLd, breadcrumbSchema, graph } from '@/components/seo/json-ld';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Book a Free Consultation',
  description:
    'Pick a time or send us the basics. We will walk you through candidates, pricing and how quickly Corbin Staffing can get someone started.',
  path: '/book-a-consult',
});

export default function BookConsultPage() {
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Book a Consultation', path: '/book-a-consult' },
          ])
        )}
      />
      <BookConsultSection />
    </>
  );
}
