import HeroSection from '../components/ui/hero-section';
import BaseLayout from '../components/layout/base-layout';
import { getLocale } from '../i18n/request';
import FlipAnimationLink from '../components/ui/flip-animation-link';
import { Metadata } from 'next';

interface HomepageData {
  id: number;
  documentId: string;
  title: string;
  metaDescription: string;
  content: string;
  locale: string;
}

async function getHomepageData(locale: string): Promise<HomepageData | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/homepage?locale=${locale}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`,
        },
        next: { revalidate: 60 },
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

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const homepageData = await getHomepageData(locale);

  return {
    title: homepageData?.title || 'My Awesome Page',
    description:
      homepageData?.metaDescription ||
      'A concise and engaging description of my awesome page content.',
  };
}

export default async function HomePage() {
  const locale = await getLocale();

  return (
    <BaseLayout>
      <FlipAnimationLink locale={locale} />
      <HeroSection />
    </BaseLayout>
  );
}
