'use server';

interface SizeGuideData {
  id: number;
  documentId: string;
  title: string;
  description: string;
  content: string;
  sizes: Array<{
    'Foot Length CM': string;
    'Lqdam Size': number;
    'Vans Similar Size': number;
    'Converse Similar Size': number;
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
        next: { revalidate: 7200 }, // Cache for 2 hours - size guide rarely changes
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
