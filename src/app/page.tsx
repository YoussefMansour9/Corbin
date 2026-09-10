import dynamic from 'next/dynamic';
import { HeroSection } from '@/components/landing/hero-section';
import { HowItWorksSection } from '@/components/landing/how-it-works-section';
import { IndustriesPreview } from '@/components/landing/industries-preview';
import { AfterHoursPromo } from '@/components/landing/after-hours-promo';
import { WhyChooseUsSection } from '@/components/landing/why-choose-us-section';
import { AboutSection } from '@/components/landing/about-section';
import { JsonLd, employmentAgencySchema, graph, serviceSchema } from '@/components/seo/json-ld';

// Only the Calendly embed is worth splitting out: it is the one client
// component here, and it pulls in a third-party widget. The other sections are
// server components that ship no client JS, so wrapping them in dynamic() only
// added Suspense boundaries and placeholder-height layout shift.
const CalendlyEmbed = dynamic(() =>
  import('@/components/vertical/calendly-embed').then((mod) => ({ default: mod.CalendlyEmbed }))
);

export default function Home() {
  return (
    <>
      <JsonLd
        data={graph(
          employmentAgencySchema(),
          serviceSchema({
            name: 'Dedicated Remote Staffing',
            description:
              'Pre-vetted, background-checked remote employees for U.S. businesses, starting at $7 per hour with payroll, HR and replacement included.',
            path: '/',
            serviceType: 'Staffing',
          })
        )}
      />

      <HeroSection />
      <IndustriesPreview />
      <HowItWorksSection />
      <AfterHoursPromo />
      <WhyChooseUsSection />
      <AboutSection />
      {/* One booking calendar per page. The Ready to Hire form lives at /contact. */}
      <CalendlyEmbed
        headline="Book a Free Consultation"
        description="Pick a time that works for you. We'll discuss your staffing needs and how Corbin can help."
      />
    </>
  );
}
