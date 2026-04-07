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
  const prices = product.variants.map((v) => v.price).filter((p) => p > 0);
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;
  const hasMultiplePrices = minPrice !== maxPrice;

  const inStockVariants = product.variants.filter((v) => v.stock > 0);
  const inStock = inStockVariants.length > 0;

  const priceValidUntil = new Date(
    new Date().setFullYear(new Date().getFullYear() + 1),
  ).toISOString().split('T')[0];

  const productUrl = `${baseUrl}/store/${product.documentId}`;

  // Build image array — cover first, then remaining images
  const allImages: string[] = [];
  if (product.coverImage?.url) allImages.push(product.coverImage.url);
  for (const img of product.images || []) {
    if (img.url && img.url !== product.coverImage?.url) allImages.push(img.url);
  }

  const seller = {
    '@type': 'Organization',
    name: 'Lqdam',
    url: baseUrl,
  };

  // Use individual Offer per in-stock variant when possible, otherwise AggregateOffer
  const offers = hasMultiplePrices
    ? {
        '@type': 'AggregateOffer',
        url: productUrl,
        priceCurrency: 'AED',
        lowPrice: minPrice,
        highPrice: maxPrice,
        offerCount: product.variants.length,
        availability: inStock
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
        seller,
      }
    : {
        '@type': 'Offer',
        url: productUrl,
        priceCurrency: 'AED',
        price: minPrice,
        priceValidUntil,
        availability: inStock
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
        itemCondition: 'https://schema.org/NewCondition',
        seller,
      };

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: allImages.length > 0 ? allImages : undefined,
    sku: product.variants[0]?.sku || product.documentId,
    brand: {
      '@type': 'Brand',
      name: 'Lqdam',
    },
    offers,
  };
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
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/images/app-logo-black.png`,
    },
    description: 'Arabic minimalist footwear brand from the UAE. Canvas and rubber barefoot shoes inspired by Shanghai heritage, built for natural movement.',
    sameAs: [
      'https://www.instagram.com/lqdam_shoes',
      'https://www.tiktok.com/@lqdam_shoes',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      availableLanguage: ['English', 'Arabic'],
      url: 'https://wa.me/971557951916',
    },
  };
}

/**
 * Generates WebSite structured data (JSON-LD) — enables Google Sitelinks Searchbox
 */
export function generateWebSiteSchema(baseUrl: string): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Lqdam',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/store?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generates FAQ structured data (JSON-LD) for rich results
 */
export function generateFAQSchema(
  items: Array<{ question: string; answer: string }>,
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
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
