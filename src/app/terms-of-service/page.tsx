import BaseLayout from '../../components/layout/base-layout';
import { getLocale } from '../../i18n/request';
import { Metadata } from 'next';
import { getTermsOfServiceData } from '../../(actions)/terms-of-service';
import ReactMarkdown from 'react-markdown';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const termsOfServiceData = await getTermsOfServiceData(locale);

  return {
    title: termsOfServiceData?.title || 'Terms of Service',
    description:
      termsOfServiceData?.metaDescription ||
      'Read our terms of service to understand the rules and regulations.',
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
