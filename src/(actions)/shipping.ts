'use server';

import { Shipping } from '../store/shipping-store';

export async function getShippingData(): Promise<Shipping[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/shippings`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`,
        },
        next: { revalidate: 3600 }, // Cache for 1 hour - shipping data rarely changes
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch shipping data');
    }

    const data = await response.json();
    return data.data || [];
  } catch (error: any) {
    console.error('Error fetching shipping data:', error);
    return [];
  }
}
