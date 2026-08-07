import { MetadataRoute } from 'next';
import { getProducts } from '../(actions)/products';

const PRODUCTS_PAGE_SIZE = 100;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lqdam.com';

  // Static routes. Locale is cookie-based (NEXT_LOCALE), not a separate URL,
  // so there is no distinct ar/en URL to list as an alternate.
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/store`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/partners`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/size-guide`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/shipping-returns`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Fetch all products (paginating past the first page if there are more
  // than PRODUCTS_PAGE_SIZE), then map to routes.
  const allProducts = [];
  let page = 1;
  while (true) {
    const { products, pagination } = await getProducts({
      locale: 'en',
      page,
      pageSize: PRODUCTS_PAGE_SIZE,
    });
    allProducts.push(...products);
    if (!pagination || page >= pagination.pageCount) break;
    page += 1;
  }

  const productRoutes: MetadataRoute.Sitemap = allProducts.map((product) => ({
    url: `${baseUrl}/store/${product.documentId}`,
    lastModified: new Date(product.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}
