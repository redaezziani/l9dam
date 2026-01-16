'use client';

import { useLocale, useTranslations } from 'next-intl';
import ReactMarkdown from 'react-markdown';
import { useEffect, useState } from 'react';

interface PartnersPageData {
  id: number;
  documentId: string;
  title: string;
  content: string;
  locale: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface Partner {
  id: number;
  documentId: string;
  title: string;
  description: string;
  link?: string;
  country?: string;
  cities?: string[];
  locale: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export default function PartnersClient() {
  const locale = useLocale();
  const t = useTranslations('PartnersPage');
  const [partnersPageData, setPartnersPageData] =
    useState<PartnersPageData | null>(null);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // Fetch partners page data
        const pageRes = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/partners-page?locale=${locale}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`,
            },
          },
        );

        if (pageRes.ok) {
          const pageData = await pageRes.json();
          setPartnersPageData(pageData.data);
        }

        // Fetch partners list
        const partnersRes = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/partners?locale=${locale}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`,
            },
          },
        );

        if (partnersRes.ok) {
          const partnersData = await partnersRes.json();
          console.log('Partners data:', partnersData);
          setPartners(partnersData.data || []);
        }
      } catch (error) {
        console.error('Error loading partners:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [locale]);

  return (
    <section className="w-full   sm:max-w-5xl pb-4 flex flex-col gap-6 px-4">
      <h1 className="text-3xl text-center font-bold text-[#4a403a] pt-4">
        {partnersPageData?.title || t('title')}
      </h1>

      <div className="prose prose-sm max-w-none text-[#4a403a] prose-img:rounded-none">
        <ReactMarkdown>{partnersPageData?.content || ''}</ReactMarkdown>
      </div>

      {loading ? (
        <p className="text-gray-500">{t('loading')}</p>
      ) : partners.length === 0 ? (
        <p className="text-gray-500">{t('noPartnersFound')}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {partners.map((partner) => (
            <div
              key={partner.documentId}
              className="border border-gray-200 rounded-lg py-6 hover:shadow-md transition-shadow"
            >
              <p className="text-xl font-semibold text-[#4a403a] mb-2">
                {partner.title}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                {partner.description}
              </p>

              {partner.country && (
                <p className="text-xs text-gray-500 mb-1">
                  <span className="font-medium">{t('country')}:</span>{' '}
                  {partner.country}
                </p>
              )}

              {partner.cities && partner.cities.length > 0 && (
                <p className="text-xs text-gray-500 mb-3">
                  <span className="font-medium">{t('cities')}:</span>{' '}
                  {partner.cities.join(', ')}
                </p>
              )}

              {partner.link && (
                <a
                  href={partner.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800 underline"
                >
                  {t('visitWebsite')}
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
