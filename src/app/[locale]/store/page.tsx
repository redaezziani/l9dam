import BaseLayout from '@/src/components/layout/base-layout';
import { Metadata } from 'next';
import { getLocale } from '@/src/i18n/request';
import StoreClient from './store-client';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const seo = messages.SEO.store;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lqdam.com';

  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: 'website',
      locale: locale === 'ar' ? 'ar_AE' : 'en_US',
      url: '/store',
      images: [
        {
          url: `${baseUrl}/images/app-logo-black.png`,
          width: 1200,
          height: 630,
          alt: 'Lqdam Store - Shop Kung Fu Shoes',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: [`${baseUrl}/images/app-logo-black.png`],
    },
    alternates: {
      canonical: '/store',
      languages: {
        'en': '/store',
        'ar': '/store',
      },
    },
  };
}

export default function StorePage() {
  return (
    <BaseLayout>
      <StoreClient />
    </BaseLayout>
  );
}
