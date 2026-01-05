import BaseLayout from '../../components/layout/base-layout';
import { getLocale } from '../../i18n/request';
import { Metadata } from 'next';
import { getSizeGuideData } from '../../(actions)/size-guide';
import ReactMarkdown from 'react-markdown';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

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

  // Fallback to empty array if no data
  const sizes = sizeGuideData?.sizes || [];

  return (
    <BaseLayout>
      <section className="max-w-5xl mx-auto px-4 py-6 flex flex-col gap-6">
        <h1 className="text-3xl font-bold">{sizeGuideData?.title || 'Size Guide'}</h1>
        <p className="text-gray-600">{sizeGuideData?.description || ''}</p>

        {/* Rich Content from Strapi */}
        {sizeGuideData?.content && (
          <div className="prose prose-sm max-w-none text-[#4a403a]">
            <ReactMarkdown>{sizeGuideData.content}</ReactMarkdown>
          </div>
        )}

        {/* Size Table */}
        {sizes.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-3">Size Chart</h2>

            <div className="overflow-x-auto border border-gray-300 rounded">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 border">EU</th>
                    <th className="p-2 border">US</th>
                    <th className="p-2 border">Foot Length</th>
                  </tr>
                </thead>
                <tbody>
                  {sizes.map((s, index) => (
                    <tr key={index}>
                      <td className="p-2 border text-center">{s.eu}</td>
                      <td className="p-2 border text-center">{s.us}</td>
                      <td className="p-2 border text-center">{s.foot}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </BaseLayout>
  );
}
