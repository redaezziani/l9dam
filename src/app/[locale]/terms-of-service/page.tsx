import BaseLayout from '../../../components/layout/base-layout';
import { getLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { getTermsOfServiceData } from '../../../(actions)/terms-of-service';
import { localizedPath } from '../../../lib/seo-utils';
import ReactMarkdown from 'react-markdown';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const termsOfServiceData = await getTermsOfServiceData(locale);
  const messages = (await import(`../../../../messages/${locale}.json`)).default;
  const seo = messages.SEO.termsOfService;

  const title = termsOfServiceData?.title || seo.title;
  const description = termsOfServiceData?.metaDescription || seo.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: locale === 'ar' ? 'ar_AE' : 'en_US',
      url: localizedPath('/terms-of-service', locale),
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
    alternates: {
      canonical: localizedPath('/terms-of-service', locale),
      languages: {
        en: localizedPath('/terms-of-service', 'en'),
        ar: localizedPath('/terms-of-service', 'ar'),
      },
    },
  };
}

export default async function TermsOfServicePage() {
  const locale = await getLocale();
  const termsOfServiceData = await getTermsOfServiceData(locale);

  return (
    <BaseLayout>
      <section className="w-full text-center md:max-w-360 pb-4 flex flex-col gap-6 px-4">
        <div className="prose prose-sm max-w-none text-[#4a403a] pt-4 prose-img:rounded-none">
          <ReactMarkdown>{termsOfServiceData?.content || ''}</ReactMarkdown>
        </div>
        {termsOfServiceData?.lastUpdated && (
          <div className="text-sm text-gray-500 mt-4">
            Last Updated: {new Date(termsOfServiceData.lastUpdated).toLocaleDateString(locale)}
          </div>
        )}
      </section>
    </BaseLayout>
  );
}
