'use client';

import BaseLayout from '@/src/components/layout/base-layout';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function SizeGuidePage() {
  const t = useTranslations('SizeGuide');

  const sizes = [
    { eu: 36, us: 5, foot: '22.5 cm' },
    { eu: 37, us: 6, foot: '23.0 cm' },
    { eu: 38, us: 7, foot: '24.0 cm' },
    { eu: 39, us: 8, foot: '24.5 cm' },
    { eu: 40, us: 9, foot: '25.0 cm' },
    { eu: 41, us: 9.5, foot: '26.0 cm' },
    { eu: 42, us: 10, foot: '26.5 cm' },
    { eu: 43, us: 11, foot: '27.0 cm' },
    { eu: 44, us: 12, foot: '28.0 cm' },
    { eu: 45, us: 13, foot: '28.5 cm' },
    { eu: 46, us: 14, foot: '29.0 cm' },
  ];

  return (
    <BaseLayout>
      <section className="max-w-5xl mx-auto px-4 py-6 flex flex-col gap-6">
        <p className="text-sm">
          <Link href="/store" className="text-blue-600 underline">
            {t('backToStore')}
          </Link>{' '}
          / {t('title')}
        </p>

        <h1 className="text-3xl font-bold">{t('title')}</h1>
        <p className="text-gray-600">{t('description')}</p>

        {/* How to Measure */}
        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">{t('howToMeasureTitle')}</h2>
          <ol className="list-decimal list-inside text-gray-700 space-y-1">
            <li>{t('m1')}</li>
            <li>{t('m2')}</li>
            <li>{t('m3')}</li>
            <li>{t('m4')}</li>
          </ol>
        </div>

        {/* Size Table */}
        <div>
          <h2 className="text-xl font-semibold mb-3">{t('sizeChart')}</h2>

          <div className="overflow-x-auto border border-gray-300 rounded">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border">{t('eu')}</th>
                  <th className="p-2 border">{t('us')}</th>
                  <th className="p-2 border">{t('footLength')}</th>
                </tr>
              </thead>
              <tbody>
                {sizes.map((s) => (
                  <tr key={s.eu}>
                    <td className="p-2 border text-center">{s.eu}</td>
                    <td className="p-2 border text-center">{s.us}</td>
                    <td className="p-2 border text-center">{s.foot}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-gray-600 text-sm">{t('note')}</p>
      </section>
    </BaseLayout>
  );
}
