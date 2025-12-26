'use server';

interface ShippingReturnsData {
  id: number;
  documentId: string;
  title: string;
  metaDescription: string;
  content: string;
  lastUpdated?: string;
  locale: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export async function getShippingReturnsData(locale: string): Promise<ShippingReturnsData | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/shipping-returns?locale=${locale}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`,
        },
        next: { revalidate: 60 }, // Cache for 1 minute
      }
    );

    if (!res.ok) return null;

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching shipping & returns data:', error);
    return null;
  }
}
