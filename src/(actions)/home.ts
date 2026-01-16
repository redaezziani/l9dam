'use server';

interface HomepageData {
  id: number;
  documentId: string;
  title: string;
  metaDescription: string;
  content: string;
  locale: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export async function getHomepageData(locale: string): Promise<HomepageData | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/homepage?locale=${locale}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`,
        },
        next: { revalidate: 1800 }, // Cache for 30 minutes - homepage content rarely changes
      }
    );

    if (!res.ok) return null;

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching homepage data:', error);
    return null;
  }
}
