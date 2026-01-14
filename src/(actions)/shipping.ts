'use server';

export interface PriceRule {
  maxItems: number;
  shippingPrice: number;
}

export interface Shipping {
  id: number;
  documentId: string;
  region: string;
  cities: string[];
  priceRules: PriceRule[];
  kg?: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface ShippingResponse {
  data: Shipping[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export async function getShippings(): Promise<Shipping[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/shippings`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`,
        },
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    );

    if (!res.ok) {
      console.error('Failed to fetch shippings:', res.status, res.statusText);
      return [];
    }

    const data: ShippingResponse = await res.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching shippings:', error);
    return [];
  }
}
