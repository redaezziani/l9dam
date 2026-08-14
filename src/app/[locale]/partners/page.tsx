import BaseLayout from '../../../components/layout/base-layout';
import { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { localizedPath } from '../../../lib/seo-utils';
import PartnersClient from './partners-client';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const messages = (await import(`../../../../messages/${locale}.json`)).default;
  const seo = messages.SEO.partners;

  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: 'website',
      locale: locale === 'ar' ? 'ar_AE' : 'en_US',
      url: localizedPath('/partners', locale),
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
    },
    alternates: {
      canonical: localizedPath('/partners', locale),
      languages: {
        en: localizedPath('/partners', 'en'),
        ar: localizedPath('/partners', 'ar'),
      },
    },
  };
}

export default function PartnersPage() {
  return (
    <BaseLayout>
      <PartnersClient />
    </BaseLayout>
  );
}
