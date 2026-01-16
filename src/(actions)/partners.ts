'use server';

interface PartnersPageData {
  id: number;
  documentId: string;
  title: string;
  content: string;
  locale: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface Partner {
  id: number;
  documentId: string;
  title: string;
  description: string;
  link?: string;
  country?: string;
  cities?: string[];
  locale: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export async function getPartnersPageData(locale: string): Promise<PartnersPageData | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/partners-page?locale=${locale}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`,
        },
        next: { revalidate: 1800 }, // Cache for 30 minutes - partners change occasionally
      }
    );

    if (!res.ok) return null;

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching partners page data:', error);
    return null;
  }
}

export async function getPartners(locale: string): Promise<Partner[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/partners?locale=${locale}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`,
        },
        next: { revalidate: 1800 }, // Cache for 30 minutes - partners change occasionally
      }
    );

    if (!res.ok) return [];

    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching partners:', error);
    return [];
  }
}
