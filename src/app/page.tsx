import HeroSection from '../components/ui/hero-section';
import BaseLayout from '../components/layout/base-layout';
import { getLocale } from '../i18n/request';
import FlipAnimationLink from '../components/ui/flip-animation-link';
import { Metadata } from 'next';
import { getHomepageData } from '../(actions)/home';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const homepageData = await getHomepageData(locale);

  const title = homepageData?.title || 'Lqdam - Authentic Kung Fu Shoes';
  const description = homepageData?.metaDescription || 'Discover authentic kung fu shoes from Lqdam. Lightweight, durable, and comfortable footwear inspired by Shaolin tradition.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: locale === 'ar' ? 'ar_AE' : 'en_US',
      url: '/',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: '/',
      languages: {
        'en': '/en',
        'ar': '/ar',
      },
    },
  };
}

export default async function HomePage() {
  const locale = await getLocale();
  const homepageData = await getHomepageData(locale);

  return (
    <BaseLayout>
      <FlipAnimationLink locale={locale} />
      <HeroSection content={homepageData?.content || ''} />
    </BaseLayout>
  );
}
