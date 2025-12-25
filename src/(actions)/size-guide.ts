'use server';

interface SizeGuideData {
  id: number;
  documentId: string;
  title: string;
  description: string;
  content: string;
  sizes: Array<{
    eu: number;
    us: number | string;
    foot: string;
  }>;
  locale: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export async function getSizeGuideData(locale: string): Promise<SizeGuideData | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/size-guide?locale=${locale}`,
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
    console.error('Error fetching size guide data:', error);
    return null;
  }
}
