import BaseLayout from '../../components/layout/base-layout';
import { getLocale } from '../../i18n/request';
import { Metadata } from 'next';
import { getSizeGuideData } from '../../(actions)/size-guide';
import SizeGuideContent from './SizeGuideContent';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const sizeGuideData = await getSizeGuideData(locale);

  return {
    title: sizeGuideData?.title || 'Size Guide',
    description: sizeGuideData?.description || 'Find the right size for you.',
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
