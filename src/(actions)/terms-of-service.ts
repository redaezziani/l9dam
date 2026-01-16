'use server';

interface TermsOfServiceData {
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

export async function getTermsOfServiceData(locale: string): Promise<TermsOfServiceData | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/terms-of-service?locale=${locale}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`,
        },
        next: { revalidate: 86400 }, // Cache for 24 hours - legal content changes very rarely
      }
    );

    if (!res.ok) return null;

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching terms of service data:', error);
    return null;
  }
}
