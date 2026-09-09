import type { Metadata } from 'next';
import { roofingPageData } from '@/lib/vertical-page-data';
import { VerticalHero } from '@/components/vertical/vertical-hero';
import { VerticalProblem } from '@/components/vertical/vertical-problem';
import { VerticalRoles } from '@/components/vertical/vertical-roles';
import { VerticalCostComparison } from '@/components/vertical/vertical-cost-comparison';
import { VerticalHowItWorks } from '@/components/vertical/vertical-how-it-works';
import { VerticalFAQ } from '@/components/vertical/vertical-faq';
import { CalendlyEmbed } from '@/components/vertical/calendly-embed';
import { StickyMobileCTA } from '@/components/vertical/sticky-mobile-cta';

const data = roofingPageData;

export const metadata: Metadata = {
  title: data.seo.title,
  description: data.seo.description,
  alternates: {
    canonical: data.seo.canonicalPath,
  },
  openGraph: {
    title: data.seo.title,
    description: data.seo.description,
    url: data.seo.canonicalPath,
    type: 'website',
    images: [
      {
        url: data.hero.backgroundImage,
        width: 1200,
        height: 630,
        alt: 'Roofing office staffing by Corbin Staffing',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: data.seo.title,
    description: data.seo.description,
    images: [data.hero.backgroundImage],
  },
};

function FAQJsonLd() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faq.items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export default function RoofingPage() {
  return (
    <>
      <FAQJsonLd />

      <VerticalHero
        headline={data.hero.headline}
        subheadline={data.hero.subheadline}
        ctaText={data.hero.ctaText}
        ctaLink={data.hero.ctaLink}
        backgroundImage={data.hero.backgroundImage}
        backgroundImageAlt={data.hero.backgroundImageAlt}
      />

      <VerticalProblem
        headline={data.problem.headline}
        body={data.problem.body}
        painPoints={data.problem.painPoints}
      />

      <VerticalRoles
        headline={data.roles.headline}
        cards={data.roles.cards}
        closingLine={data.roles.closingLine}
      />

      <VerticalCostComparison
        headline={data.costComparison.headline}
        rows={data.costComparison.rows}
        localColumnHeader={data.costComparison.localColumnHeader}
        corbinColumnHeader={data.costComparison.corbinColumnHeader}
        closingLine={data.costComparison.closingLine}
      />

      <VerticalHowItWorks
        headline={data.howItWorks.headline}
        steps={data.howItWorks.steps}
      />

      <VerticalFAQ
        headline={data.faq.headline}
        items={data.faq.items}
      />

      <CalendlyEmbed />

      <StickyMobileCTA
        ctaText={data.hero.ctaText}
        ctaLink={data.hero.ctaLink}
      />
    </>
  );
}
