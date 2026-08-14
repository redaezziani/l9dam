import HeroSection from '../../components/ui/hero-section';
import BaseLayout from '../../components/layout/base-layout';
import { getLocale } from 'next-intl/server';
import FlipAnimationLink from '../../components/ui/flip-animation-link';
import { Metadata } from 'next';
import { getHomepageData } from '../../(actions)/home';
import { localizedPath } from '../../lib/seo-utils';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const homepageData = await getHomepageData(locale);
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const seo = messages.SEO.home;

  const title = homepageData?.title || seo.title;
  const description = homepageData?.metaDescription || seo.description;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lqdam.com';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: locale === 'ar' ? 'ar_AE' : 'en_US',
      url: localizedPath('/', locale),
      images: [
        {
          url: `${baseUrl}/images/app-logo-black.png`,
          width: 1200,
          height: 630,
          alt: 'Lqdam - Authentic Kung Fu Shoes',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/images/app-logo-black.png`],
    },
    alternates: {
      canonical: localizedPath('/', locale),
      languages: {
        en: localizedPath('/', 'en'),
        ar: localizedPath('/', 'ar'),
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
