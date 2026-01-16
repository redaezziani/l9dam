import BaseLayout from '../../components/layout/base-layout';
import { getLocale } from '../../i18n/request';
import { Metadata } from 'next';
import { getSizeGuideData } from '../../(actions)/size-guide';
import SizeGuideContent from './SizeGuideContent';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const sizeGuideData = await getSizeGuideData(locale);

  const title = sizeGuideData?.title || 'Size Guide';
  const description = sizeGuideData?.description || 'Find the right size for you.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: locale === 'ar' ? 'ar_AE' : 'en_US',
      url: '/size-guide',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: '/size-guide',
      languages: {
        'en': '/size-guide',
        'ar': '/size-guide',
      },
    },
  };
}

export default async function SizeGuidePage() {
  const locale = await getLocale();
  const sizeGuideData = await getSizeGuideData(locale);

  return (
    <BaseLayout>
      <SizeGuideContent sizeGuideData={sizeGuideData} />
    </BaseLayout>
  );
}
