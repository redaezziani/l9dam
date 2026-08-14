import BaseLayout from '../../../components/layout/base-layout';
import { getLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { getSizeGuideData } from '../../../(actions)/size-guide';
import SizeGuideContent from './SizeGuideContent';
import { generateFAQSchema, localizedPath } from '../../../lib/seo-utils';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const sizeGuideData = await getSizeGuideData(locale);
  const messages = (await import(`../../../../messages/${locale}.json`)).default;
  const seo = messages.SEO.sizeGuide;

  const title = sizeGuideData?.title || seo.title;
  const description = sizeGuideData?.description || seo.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: locale === 'ar' ? 'ar_AE' : 'en_US',
      url: localizedPath('/size-guide', locale),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: localizedPath('/size-guide', locale),
      languages: {
        en: localizedPath('/size-guide', 'en'),
        ar: localizedPath('/size-guide', 'ar'),
      },
    },
  };
}

export default async function SizeGuidePage() {
  const locale = await getLocale();
  const sizeGuideData = await getSizeGuideData(locale);

  const isAr = locale === 'ar';
  const faqSchema = generateFAQSchema([
    {
      question: isAr ? 'كيف أقيس قدمي لاختيار المقاس الصحيح؟' : 'How do I measure my foot to find the right Lqdam size?',
      answer: isAr
        ? 'ضع قدمك على ورقة مسطحة، ضع علامة على أطول إصبع وعقب القدم، ثم قِس المسافة بينهما بالسنتيمتر. استخدم جدول المقاسات للعثور على مقاس لقدّام المناسب.'
        : 'Place your foot flat on paper, mark the tip of your longest toe and the back of your heel, then measure the distance in centimeters. Use our size chart to find your matching Lqdam size.',
    },
    {
      question: isAr ? 'هل مقاسات لقدّام مطابقة لمقاسات Vans؟' : 'Do Lqdam sizes match Vans sizes?',
      answer: isAr
        ? 'المقاسات متقاربة لكنها ليست متطابقة تمامًا. يُنصح بمقارنة طول قدمك بالسنتيمتر مع جدول المقاسات للحصول على أدق نتيجة.'
        : 'Lqdam sizing is similar to Vans but not identical. We recommend comparing your foot length in centimeters against our size chart for the most accurate fit.',
    },
    {
      question: isAr ? 'هل مقاسات لقدّام مطابقة لمقاسات Converse؟' : 'Do Lqdam sizes match Converse sizes?',
      answer: isAr
        ? 'المقاسات قريبة من Converse. يمكنك مراجعة جدول المقارنة على هذه الصفحة لمعرفة المقاس المناسب لك بدقة.'
        : 'Lqdam sizing is close to Converse. Check the comparison chart on this page to find your best match.',
    },
    {
      question: isAr ? 'ماذا أفعل إذا كانت قدمي بين مقاسين؟' : 'What if my foot length falls between two sizes?',
      answer: isAr
        ? 'إذا كان طول قدمك بين مقاسين، نوصي باختيار المقاس الأكبر للحصول على راحة أفضل عند الحركة.'
        : 'If your foot length falls between two sizes, we recommend going up to the larger size for better comfort and movement.',
    },
  ]);

  return (
    <BaseLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SizeGuideContent sizeGuideData={sizeGuideData} />
    </BaseLayout>
  );
}
