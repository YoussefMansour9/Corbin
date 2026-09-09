import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://corbinstaffing.com';

  const routes = [
    '',
    '/about',
    '/pricing',
    '/services',
    '/team',
    '/locations',
    '/contact',
    '/book-a-consult',
    '/how-it-works',
    '/roofing',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/roofing' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route === '/roofing' ? 0.9 : 0.8,
  }));
}
