import type { MetadataRoute } from 'next';
import { industries } from '@/lib/industries-data';

const baseUrl = 'https://corbinstaffing.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/industries',
    '/after-hours',
    '/how-it-works',
    '/pricing',
    '/team',
    '/results',
    '/about',
    '/meet-corbin-talent',
    '/locations',
    '/security',
    '/contact',
    '/book-a-consult',
    '/roofing',
  ];

  const industryRoutes = industries.map((industry) => `/industries/${industry.slug}`);

  return [...staticRoutes, ...industryRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/roofing' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route === '/roofing' || route === '/after-hours' ? 0.9 : 0.8,
  }));
}
