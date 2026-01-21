import { Metadata } from 'next';
import { Product } from '../store/prodcuts-store';

/**
 * Truncates text to a specific length with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}

/**
 * Generates meta description with optimal length (150-160 characters)
 */
export function generateMetaDescription(text: string): string {
  return truncateText(text, 160);
}

/**
 * Generates meta title with optimal length (50-60 characters)
 */
export function generateMetaTitle(title: string, suffix = 'Lqdam'): string {
  const maxLength = 60;
  const withSuffix = `${title} | ${suffix}`;

  if (withSuffix.length <= maxLength) {
    return withSuffix;
  }

  // If too long, truncate the title part
  const availableLength = maxLength - suffix.length - 3; // -3 for ' | '
  return `${truncateText(title, availableLength)} | ${suffix}`;
}

/**
 * Generates product structured data (JSON-LD) for rich snippets
 */
export function generateProductSchema(
  product: Product,
  locale: string,
  baseUrl: string,
): object {
  const minPrice = product.variants.length > 0
    ? Math.min(...product.variants.map((v) => v.price))
    : 0;

  const maxPrice = product.variants.length > 0
    ? Math.max(...product.variants.map((v) => v.price))
    : 0;

  const inStock = product.variants.some((v) => v.stock > 0);

  const imageUrl = product.coverImage?.url || product.images?.[0]?.url || '';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: imageUrl,
    sku: product.documentId,
    brand: {
      '@type': 'Brand',
      name: 'Lqdam',
    },
    offers: {
      '@type': minPrice === maxPrice ? 'Offer' : 'AggregateOffer',
      url: `${baseUrl}/store/${product.documentId}`,
      priceCurrency: 'AED',
      price: minPrice,
      ...(minPrice !== maxPrice && {
        lowPrice: minPrice,
        highPrice: maxPrice,
      }),
      availability: inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      priceValidUntil: new Date(
        new Date().setFullYear(new Date().getFullYear() + 1)
      ).toISOString().split('T')[0],
    },
  };

  return schema;
}

/**
 * Generates breadcrumb structured data (JSON-LD)
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>,
  baseUrl: string,
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  };
}

/**
 * Generates organization structured data (JSON-LD)
 */
export function generateOrganizationSchema(baseUrl: string): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Lqdam',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description: 'Authentic kung fu shoes inspired by Shaolin tradition',
    sameAs: [
      // Add your social media URLs here
    ],
  };
}

/**
 * Generates product metadata for Next.js pages
 */
export function generateProductMetadata(
  product: Product,
  locale: string,
  baseUrl: string,
): Metadata {
  const title = generateMetaTitle(product.name);
  const description = generateMetaDescription(product.description);
  const imageUrl = product.coverImage?.url || product.images?.[0]?.url || '';
  const url = `/store/${product.documentId}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: locale === 'ar' ? 'ar_AE' : 'en_US',
      url,
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: product.name,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
    alternates: {
      canonical: url,
      languages: {
        en: url,
        ar: url,
      },
    },
  };
}
