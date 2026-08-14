import BaseLayout from '../../../components/layout/base-layout';
import { getLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { getShippingReturnsData } from '../../../(actions)/shipping-returns';
import { localizedPath } from '../../../lib/seo-utils';
import ReactMarkdown from 'react-markdown';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const shippingReturnsData = await getShippingReturnsData(locale);
  const messages = (await import(`../../../../messages/${locale}.json`)).default;
  const seo = messages.SEO.shippingReturns;

  const title = shippingReturnsData?.title || seo.title;
  const description = shippingReturnsData?.metaDescription || seo.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: locale === 'ar' ? 'ar_AE' : 'en_US',
      url: localizedPath('/shipping-returns', locale),
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
    alternates: {
      canonical: localizedPath('/shipping-returns', locale),
      languages: {
        en: localizedPath('/shipping-returns', 'en'),
        ar: localizedPath('/shipping-returns', 'ar'),
      },
    },
  };
}

export default async function ShippingReturnsPage() {
  const locale = await getLocale();
  const shippingReturnsData = await getShippingReturnsData(locale);

  return (
    <BaseLayout>
      <section className="w-full text-center  sm:max-w-5xl  pb-4 flex flex-col gap-6 px-4">
        <div className="prose prose-sm max-w-none text-[#4a403a] pt-4 prose-img:rounded-none">
          <ReactMarkdown>{shippingReturnsData?.content || ''}</ReactMarkdown>
        </div>
        {shippingReturnsData?.lastUpdated && (
          <div className="text-sm text-gray-500 mt-4">
            Last Updated:{' '}
            {new Date(shippingReturnsData.lastUpdated).toLocaleDateString(
              locale,
            )}
          </div>
        )}
      </section>
    </BaseLayout>
  );
}
