// app/sitemap.ts
import type { MetadataRoute } from 'next';

const URL = 'https://yourdomain.com'; // Replace with your actual domain

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticRoutes = [
    '', // Homepage
    '/features',
    '/pricing',
    '/about',
    '/auth/login',
    '/auth/signup',
    // Add other static public pages here
  ].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as 'monthly', // Or 'weekly', 'yearly'
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic pages (e.g., blog posts, public templates - if any)
  // Example: Fetch public block templates if you have a marketplace
  // const publicTemplates = await fetchPublicTemplatesFromDB();
  // const templateRoutes = publicTemplates.map(template => ({
  //   url: `${URL}/templates/${template.id_plantilla}`,
  //   lastModified: template.updatedAt.toISOString(),
  //   changeFrequency: 'weekly',
  //   priority: 0.7,
  // }));

  return [
    ...staticRoutes,
    // ...templateRoutes, // Uncomment and implement if you have dynamic public content
  ];
}
