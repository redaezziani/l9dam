'use client';

import { useTranslations } from 'next-intl';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

interface SizeGuideData {
  id: number;
  documentId: string;
  title: string;
  description: string;
  content: string;
  sizes: Array<{
    'Foot Length CM': string;
    'Lqdam Size': number;
    'Vans Similar Size': number;
    'Converse Similar Size': number;
  }>;
  locale: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface SizeGuideContentProps {
  sizeGuideData: SizeGuideData | null;
}

export default function SizeGuideContent({
  sizeGuideData,
}: SizeGuideContentProps) {
  const t = useTranslations('SizeGuide');

  // Fallback to empty array if no data
  const sizes = sizeGuideData?.sizes || [];

  return (
    <section className=" sm:max-w-5xl w-full mx-auto px-4 py-6 flex flex-col gap-6">
      <p className="text-sm">
        <Link href="/store" className="text-blue-600 underline">
          {t('backToStore')}
        </Link>{' '}
        / {sizeGuideData?.title || t('title')}
      </p>

      <h1 className="text-3xl font-bold">
        {sizeGuideData?.title || t('title')}
      </h1>
      <p className="text-gray-600 text-start">
        {sizeGuideData?.description || t('description')}
      </p>

      {/* Rich Content from Strapi */}
      {sizeGuideData?.content && (
        <div className="prose prose-sm max-w-none text-[#4a403a]">
          <ReactMarkdown>{sizeGuideData.content}</ReactMarkdown>
        </div>
      )}

      {/* How to Measure - fallback if content is not provided */}
      {!sizeGuideData?.content && (
        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">{t('howToMeasureTitle')}</h2>
          <ol className="list-decimal list-inside text-gray-700 space-y-1">
            <li>{t('m1')}</li>
            <li>{t('m2')}</li>
            <li>{t('m3')}</li>
            <li>{t('m4')}</li>
          </ol>
        </div>
      )}

      {/* Size Table */}
      {sizes.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-3">{t('sizeChart')}</h2>

          <div className="overflow-x-auto border  rounded">
            <table className="w-full text-sm">
              <thead className="">
                <tr>
                  <th className="p-2 border">{t('footLengthCm')}</th>
                  <th className="p-2 border">{t('lqdamSize')}</th>
                  <th className="p-2 border">{t('vansSize')}</th>
                  <th className="p-2 border">{t('converseSize')}</th>
                </tr>
              </thead>
              <tbody>
                {sizes.map((s, index) => (
                  <tr key={index}>
                    <td className="p-2 border text-center">
                      {s['Foot Length CM']}
                    </td>
                    <td className="p-2 border text-center">
                      {s['Lqdam Size']}
                    </td>
                    <td className="p-2 border text-center">
                      {s['Vans Similar Size']}
                    </td>
                    <td className="p-2 border text-center">
                      {s['Converse Similar Size']}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <p className="text-gray-600 text-sm">{t('note')}</p>
    </section>
  );
}
