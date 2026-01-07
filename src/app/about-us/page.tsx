import BaseLayout from '../../components/layout/base-layout';
import { getLocale } from '../../i18n/request';
import { Metadata } from 'next';
import { getAboutUsData } from '../../(actions)/about-us';
import ReactMarkdown from 'react-markdown';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const aboutUsData = await getAboutUsData(locale);

  return {
    title: aboutUsData?.title || 'About Us',
    description:
      aboutUsData?.metaDescription || 'Learn more about us and our story.',
  };
}

export default async function AboutUsPage() {
  const locale = await getLocale();
  const aboutUsData = await getAboutUsData(locale);

  return (
    <BaseLayout>
      <section className="w-full text-center sm:max-w-7xl pb-4 flex flex-col gap-6 px-4">
        <div className="prose prose-sm max-w-none text-[#4a403a] pt-4 prose-img:rounded-none">
          <ReactMarkdown>{aboutUsData?.content || ''}</ReactMarkdown>
        </div>
      </section>
    </BaseLayout>
  );
}
