'use server';

interface AboutUsData {
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

export async function getAboutUsData(locale: string): Promise<AboutUsData | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/about-us?locale=${locale}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`,
        },
        next: { revalidate: 3600 }, // Cache for 1 hour - about us content changes infrequently
      }
    );

    if (!res.ok) return null;

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching about us data:', error);
    return null;
  }
}
