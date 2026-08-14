import BaseLayout from '@/src/components/layout/base-layout';
import { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { localizedPath } from '@/src/lib/seo-utils';
import CartClient from './cart-client';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const messages = (await import(`../../../../messages/${locale}.json`)).default;
  const seo = messages.SEO.cart;

  return {
    title: seo.title,
    description: seo.description,
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: 'website',
      locale: locale === 'ar' ? 'ar_AE' : 'en_US',
    },
    alternates: {
      canonical: localizedPath('/cart', locale),
    },
  };
}

export default function CartPage() {
  return (
    <BaseLayout>
      <CartClient />
    </BaseLayout>
  );
}
