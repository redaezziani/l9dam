import BaseLayout from '../../../components/layout/base-layout';
import { getLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { getAboutUsData } from '../../../(actions)/about-us';
import { localizedPath } from '../../../lib/seo-utils';
import ReactMarkdown from 'react-markdown';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const aboutUsData = await getAboutUsData(locale);
  const messages = (await import(`../../../../messages/${locale}.json`)).default;
  const seo = messages.SEO.aboutUs;

  const title = aboutUsData?.title || seo.title;
  const description = aboutUsData?.metaDescription || seo.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: locale === 'ar' ? 'ar_AE' : 'en_US',
      url: localizedPath('/about-us', locale),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: localizedPath('/about-us', locale),
      languages: {
        en: localizedPath('/about-us', 'en'),
        ar: localizedPath('/about-us', 'ar'),
      },
    },
  };
}

export default async function AboutUsPage() {
  const locale = await getLocale();
  const aboutUsData = await getAboutUsData(locale);

  return (
    <BaseLayout>
      <section className="w-full text-center sm:max-w-5xl pb-4 flex flex-col gap-6 px-4">
        {aboutUsData?.title && (
          <h1 className="sr-only">{aboutUsData.title}</h1>
        )}
        <div className="prose prose-sm max-w-none text-[#4a403a] pt-4 prose-img:rounded-none">
          <ReactMarkdown>{aboutUsData?.content || ''}</ReactMarkdown>
        </div>
      </section>
    </BaseLayout>
  );
}
