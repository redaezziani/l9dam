'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
import BaseLayout from '../../components/layout/base-layout';

const AboutUsPage = () => {
  const t = useTranslations('AboutFull');

  return (
    <BaseLayout>
      <section className="w-full text-center relative max-w-4xl mx-auto px-4 py-8 space-y-8">
        <h1 className="text-2xl font-bold text-gray-800">{t('title')}</h1>

        <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
          {t('intro')}
        </div>

        <div className="w-full mt-4">
          <div className="w-full mt-2">
            <img
              src={t('heroImage')}
              alt="hero"
              className="w-full object-cover"
            />
          </div>
        </div>

        <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
          <h2 className="text-lg font-semibold mt-2">
            {t('inspirationTitle')}
          </h2>
          <p className="mt-2">{t('inspiration')}</p>
        </div>

        <div className="w-full mt-2">
          <img
            src={t('heroImage')}
            alt="hero"
            className="w-full object-cover"
          />
        </div>

        <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
          <h2 className="text-lg font-semibold mt-2">{t('whyTitle')}</h2>
          <p className="mt-2">{t('why')}</p>
        </div>
      </section>
    </BaseLayout>
  );
};

export default AboutUsPage;
