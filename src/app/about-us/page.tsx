'use client';
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import BaseLayout from '../../components/layout/base-layout';
import { api } from '@/src/lib/utils';

const AboutUsPage = () => {
  const t = useTranslations('AboutFull');

  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/api/contact/send', form);
      alert('Message sent successfully');
      setForm({ name: '', email: '', message: '' });
    } catch {
      alert('Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseLayout>
      <section className="w-full text-center relative max-w-7xl mx-auto px-4 space-y-8">
        <h1 className="text-2xl font-bold text-gray-800">{t('title')}</h1>

        <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
          {t('intro')}
        </div>

        <div className="w-full mt-4">
          <img
            src={t('heroImage')}
            alt="hero"
            className="w-full object-cover"
          />
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

        {/* Contact Section */}
        <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
          <h2 className="text-lg font-semibold mt-6">{t('contactTitle')}</h2>
          <p className="mt-2">{t('contactSubtitle')}</p>

          <form
            onSubmit={handleSubmit}
            className="mt-4 max-w-md mx-auto space-y-4"
          >
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              type="text"
              placeholder={t('contactName')}
              className="w-full border px-3 py-2"
              required
            />

            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              type="email"
              placeholder={t('contactEmail')}
              className="w-full border px-3 py-2"
              required
            />

            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={4}
              placeholder={t('contactMessage')}
              className="w-full border px-3 py-2"
              required
            ></textarea>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-2 hover:bg-gray-800 disabled:opacity-50"
            >
              {loading ? 'Sending...' : t('contactSend')}
            </button>
          </form>
        </div>
      </section>
    </BaseLayout>
  );
};

export default AboutUsPage;
