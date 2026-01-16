import BaseLayout from '@/src/components/layout/base-layout';
import { Metadata } from 'next';
import { getLocale } from '@/src/i18n/request';
import StoreClient from './store-client';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const seo = messages.SEO.store;

  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: 'website',
      locale: locale === 'ar' ? 'ar_AE' : 'en_US',
      url: '/store',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
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
