import type { Metadata } from 'next';

export const siteConfig = {
  name: 'Corbin Staffing',
  url: 'https://corbinstaffing.com',
  /** Used as the <title> default and the OG site name. */
  tagline: 'Hire Dedicated Remote Staff Starting at $7/Hour',
  description:
    'Corbin Staffing places pre-vetted, background-checked remote professionals with U.S. businesses. Full-time and part-time staff starting at $7/hour, with after-hours coverage and a free replacement guarantee.',
  email: 'info@corbinstaffing.com',
  address: {
    street: '1108 Kane Concourse, STE 311',
    locality: 'Bay Harbor Islands',
    region: 'FL',
    postalCode: '33154',
    country: 'US',
  },
  sameAs: [
    'https://www.facebook.com/share/1LKHR1dMGb/?mibextid=wwXIfr',
    'https://www.linkedin.com/company/corbin-staffing',
  ],
  ogImage: '/og-image.png',
} as const;

interface PageSeoInput {
  title: string;
  description: string;
  /** Path with a leading slash, e.g. "/after-hours". */
  path: string;
}

/**
 * Builds per-page metadata with a canonical URL and matching Open Graph and
 * Twitter cards. The root layout supplies the title template and the default
 * OG image, so pages only declare what actually differs.
 */
export function pageMetadata({ title, description, path }: PageSeoInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url: path,
      siteName: siteConfig.name,
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${siteConfig.name}`,
      description,
    },
  };
}

export function absoluteUrl(path = '/') {
  return new URL(path, siteConfig.url).toString();
}
