'use server';

import { Product } from '../store/prodcuts-store';

interface FetchProductsParams {
  locale: string;
  page?: number;
  pageSize?: number;
}

export async function getProducts({
  locale,
  page = 1,
  pageSize = 25
}: FetchProductsParams): Promise<{ products: Product[], pagination: any }> {
  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/products`);
    url.searchParams.set('locale', locale);
    url.searchParams.set('pagination[page]', page.toString());
    url.searchParams.set('pagination[pageSize]', pageSize.toString());
    url.searchParams.set('populate[variants][populate]', '*');
    url.searchParams.set('populate[images]', 'true');
    url.searchParams.set('populate[coverImage]', 'true');
    url.searchParams.set('sort[0]', 'orderIndex:asc');

    const res = await fetch(url.toString(), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`,
      },
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = await res.json();

    const products: Product[] = data.data.map((p: any) => ({
      ...p,
      coverImage: p.coverImage
        ? {
            ...p.coverImage,
            url: p.coverImage.url.startsWith('http')
              ? p.coverImage.url
              : `${process.env.NEXT_PUBLIC_STRAPI_URL}${p.coverImage.url}`,
          }
        : null,
      images: (p.images || []).map((img: any) => ({
        ...img,
        url: img.url.startsWith('http')
          ? img.url
          : `${process.env.NEXT_PUBLIC_STRAPI_URL}${img.url}`,
      })),
    }));

    return {
      products,
      pagination: data.meta?.pagination || null,
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return { products: [], pagination: null };
  }
}

export async function getProductByDocumentId(
  documentId: string,
  locale: string
): Promise<Product | null> {
  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/products`);
    url.searchParams.set('locale', locale);
    url.searchParams.set('filters[documentId][$eq]', documentId);
    url.searchParams.set('populate[variants][populate]', '*');
    url.searchParams.set('populate[images]', 'true');
    url.searchParams.set('populate[coverImage]', 'true');

    const res = await fetch(url.toString(), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`,
      },
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!res.ok) return null;

    const data = await res.json();

    const product: Product | null = data.data[0]
      ? {
          ...data.data[0],
          coverImage: data.data[0].coverImage
            ? {
                ...data.data[0].coverImage,
                url: data.data[0].coverImage.url.startsWith('http')
                  ? data.data[0].coverImage.url
                  : `${process.env.NEXT_PUBLIC_STRAPI_URL}${data.data[0].coverImage.url}`,
              }
            : null,
          images: (data.data[0].images || []).map((img: any) => ({
            ...img,
            url: img.url.startsWith('http')
              ? img.url
              : `${process.env.NEXT_PUBLIC_STRAPI_URL}${img.url}`,
          })),
        }
      : null;

    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}
