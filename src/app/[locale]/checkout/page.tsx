import React, { Suspense } from 'react';
import BaseLayout from '@/src/components/layout/base-layout';
import { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { localizedPath } from '@/src/lib/seo-utils';
import CheckoutClient from './checkout-client';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const messages = (await import(`../../../../messages/${locale}.json`)).default;
  const seo = messages.SEO.checkout;

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
      canonical: localizedPath('/checkout', locale),
    },
  };
}

const CheckoutPage = () => {
  return (
    <BaseLayout>
      <Suspense fallback={<div className="w-full max-w-5xl mx-auto px-4 py-10">Loading checkout...</div>}>
        <CheckoutClient />
      </Suspense>
    </BaseLayout>
  );
};

export default CheckoutPage;
