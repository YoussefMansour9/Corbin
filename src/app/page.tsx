import dynamic from 'next/dynamic';
import { HeroSection } from '@/components/landing/hero-section';
import { HowItWorksSection } from '@/components/landing/how-it-works-section';

// Dynamic imports for below-the-fold content
const ServicesSection = dynamic(() => import('@/components/landing/services-section').then(mod => ({ default: mod.ServicesSection })), {
  loading: () => <div className="py-20 md:py-28" />
});
const AboutSection = dynamic(() => import('@/components/landing/about-section').then(mod => ({ default: mod.AboutSection })), {
  loading: () => <div className="py-20 md:py-28 bg-card" />
});
const WhyChooseUsSection = dynamic(() => import('@/components/landing/why-choose-us-section').then(mod => ({ default: mod.WhyChooseUsSection })), {
  loading: () => <div className="py-20 md:py-28" />
});
const ContactSection = dynamic(() => import('@/components/landing/contact-section').then(mod => ({ default: mod.ContactSection })), {
  loading: () => <div className="py-20 md:py-28 bg-card" />
});

export default function Home() {
  return (
    <>
      <HeroSection />
      <HowItWorksSection />
      <ServicesSection />
      <AboutSection />
      <WhyChooseUsSection />
      <ContactSection />
    </>
  );
}
