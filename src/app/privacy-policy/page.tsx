import BaseLayout from '../../components/layout/base-layout';
import { getLocale } from '../../i18n/request';
import { Metadata } from 'next';
import { getPrivacyPolicyData } from '../../(actions)/privacy-policy';
import ReactMarkdown from 'react-markdown';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const privacyPolicyData = await getPrivacyPolicyData(locale);

  const title = privacyPolicyData?.title || 'Privacy Policy';
  const description = privacyPolicyData?.metaDescription || 'Read our privacy policy to learn how we protect your data.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: locale === 'ar' ? 'ar_AE' : 'en_US',
      url: '/privacy-policy',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
    alternates: {
      canonical: '/privacy-policy',
      languages: {
        'en': '/privacy-policy',
        'ar': '/privacy-policy',
      },
    },
  };
}

export default async function PrivacyPolicyPage() {
  const locale = await getLocale();
  const privacyPolicyData = await getPrivacyPolicyData(locale);

  return (
    <BaseLayout>
      <section className="w-full text-center  sm:max-w-5xl  pb-4 flex flex-col gap-6 px-4">
        <div className="prose prose-sm max-w-none text-[#4a403a] pt-4 prose-img:rounded-none">
          <ReactMarkdown>{privacyPolicyData?.content || ''}</ReactMarkdown>
        </div>
        {privacyPolicyData?.lastUpdated && (
          <div className="text-sm text-gray-500 mt-4">
            Last Updated:{' '}
            {new Date(privacyPolicyData.lastUpdated).toLocaleDateString(locale)}
          </div>
        )}
      </section>
    </BaseLayout>
  );
}
