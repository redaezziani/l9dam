import { MetadataRoute } from 'next';
import { getProducts } from '../(actions)/products';
import { localizedPath } from '../lib/seo-utils';
import { routing } from '../i18n/routing';

const PRODUCTS_PAGE_SIZE = 100;

const STATIC_PATHS: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  priority: number;
}> = [
  { path: '/', changeFrequency: 'daily', priority: 1.0 },
  { path: '/store', changeFrequency: 'daily', priority: 0.9 },
  { path: '/about-us', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/partners', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/size-guide', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/shipping-returns', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/privacy-policy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/terms-of-service', changeFrequency: 'yearly', priority: 0.3 },
];

function alternates(path: string, baseUrl: string) {
  return Object.fromEntries(
    routing.locales.map((locale) => [
      locale,
      `${baseUrl}${localizedPath(path, locale)}`,
    ]),
  );
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lqdam.com';

  // Locale is now URL-based (localePrefix: "always" — every locale,
  // including English, is prefixed), so each locale gets its own
  // indexable entry.
  const staticRoutes: MetadataRoute.Sitemap = STATIC_PATHS.flatMap(
    ({ path, changeFrequency, priority }) =>
      routing.locales.map((locale) => ({
        url: `${baseUrl}${localizedPath(path, locale)}`,
        lastModified: new Date(),
        changeFrequency,
        priority,
        alternates: { languages: alternates(path, baseUrl) },
      })),
  );

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

  const productRoutes: MetadataRoute.Sitemap = allProducts.flatMap((product) =>
    routing.locales.map((locale) => ({
      url: `${baseUrl}${localizedPath(`/store/${product.documentId}`, locale)}`,
      lastModified: new Date(product.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      alternates: {
        languages: alternates(`/store/${product.documentId}`, baseUrl),
      },
    })),
  );

  return [...staticRoutes, ...productRoutes];
}
