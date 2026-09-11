import dynamic from 'next/dynamic';
import { HeroSection } from '@/components/landing/hero-section';
import { TrustBar } from '@/components/landing/trust-bar';
import { WhatWeStaff } from '@/components/landing/what-we-staff';
import { HowItWorksSection } from '@/components/landing/how-it-works-section';
import { IndustriesPreview } from '@/components/landing/industries-preview';
import { WhyCorbin } from '@/components/landing/why-corbin';
import { ProofCta } from '@/components/landing/proof-cta';
import { JsonLd, employmentAgencySchema, graph, serviceSchema } from '@/components/seo/json-ld';

// Only the Calendly embed is worth splitting out: it is the one client
// component here, and it pulls in a third-party widget.
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
              'Pre-vetted, background-checked remote employees for U.S. businesses. Call coverage from $7 per hour, standard VAs from $8, specialized talent from $11.',
            path: '/',
            serviceType: 'Staffing',
          })
        )}
      />

      {/* The revamp guide fixes the home page at seven sections, in this
          order. Anything that does not earn a slot belongs on its own page. */}
      <HeroSection />
      <TrustBar />
      <WhatWeStaff />
      <HowItWorksSection />
      <IndustriesPreview />
      <WhyCorbin />
      <ProofCta />
      <CalendlyEmbed
        headline="Book a Free Consultation"
        description="Pick a time that works for you. We'll discuss your staffing needs and how Corbin can help."
      />
    </>
  );
}
