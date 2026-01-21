import { MetadataRoute } from 'next';
import { getProducts } from '../(actions)/products';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lqdam.com';

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
      alternates: {
        languages: {
          en: `${baseUrl}`,
          ar: `${baseUrl}`,
        },
      },
    },
    {
      url: `${baseUrl}/store`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/store`,
          ar: `${baseUrl}/store`,
        },
      },
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          en: `${baseUrl}/about-us`,
          ar: `${baseUrl}/about-us`,
        },
      },
    },
    {
      url: `${baseUrl}/partners`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
      alternates: {
        languages: {
          en: `${baseUrl}/partners`,
          ar: `${baseUrl}/partners`,
        },
      },
    },
    {
      url: `${baseUrl}/size-guide`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
      alternates: {
        languages: {
          en: `${baseUrl}/size-guide`,
          ar: `${baseUrl}/size-guide`,
        },
      },
    },
    {
      url: `${baseUrl}/shipping-returns`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
      alternates: {
        languages: {
          en: `${baseUrl}/shipping-returns`,
          ar: `${baseUrl}/shipping-returns`,
        },
      },
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
      alternates: {
        languages: {
          en: `${baseUrl}/privacy-policy`,
          ar: `${baseUrl}/privacy-policy`,
        },
      },
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
      alternates: {
        languages: {
          en: `${baseUrl}/terms-of-service`,
          ar: `${baseUrl}/terms-of-service`,
        },
      },
    },
  ];

  // Fetch all products for both locales
  const [enProducts, arProducts] = await Promise.all([
    getProducts({ locale: 'en', page: 1, pageSize: 100 }),
    getProducts({ locale: 'ar', page: 1, pageSize: 100 }),
  ]);

  // Create product routes with bilingual support
  const productRoutes: MetadataRoute.Sitemap = enProducts.products.map((product) => ({
    url: `${baseUrl}/store/${product.documentId}`,
    lastModified: new Date(product.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
    alternates: {
      languages: {
        en: `${baseUrl}/store/${product.documentId}`,
        ar: `${baseUrl}/store/${product.documentId}`,
      },
    },
  }));

  return [...staticRoutes, ...productRoutes];
}
