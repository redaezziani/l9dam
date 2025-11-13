'use client';
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import BaseLayout from '../../components/layout/base-layout';
import AnimatedBtn from '@/src/components/retroui/animated-btn';

const AboutUsPage = () => {
  const t = useTranslations('AboutPage');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <BaseLayout>
      <section className="w-full relative z-9999 max-w-4xl mx-auto px-4 py-2">
        <img
          alt="preview"
          src="/images/slider/image-1.webp"
          className="w-full mb-6"
        />
        <div className="  p-4 mb-6">
          <h1 className="text-xl font-bold uppercase text-gray-800 mb-2">
            {t('title')}
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Column - Main Info */}
          <div className="flex-2 space-y-6">
            <div className="  p-4">
              <h2 className="text-lg font-semibold mb-3 text-gray-700 uppercase">
                {t('story.title')}
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                {t('story.content1')}
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                {t('story.content2')}
              </p>
            </div>

            <div className="  p-4">
              <h2 className="text-lg font-semibold mb-3 text-gray-700 uppercase">
                {t('mission.title')}
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                {t('mission.content')}
              </p>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <div className="   p-4">
              <h3 className="text-md font-semibold mb-3 text-gray-700 uppercase">
                {t('quickFacts.title')}
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• {t('quickFacts.established')}</li>
                <li>• {t('quickFacts.focus')}</li>
                <li>• {t('quickFacts.style')}</li>
                <li>• {t('quickFacts.commitment')}</li>
              </ul>
            </div>

            <div className="   p-4">
              <h3 className="text-md font-semibold mb-3 text-gray-700 uppercase">
                {t('contact.title')}
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>{t('contact.email')}</p>
                <p>{t('contact.support')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8   p-6">
          <div className="border-b border-gray-300 pb-4 mb-6">
            <h3 className="text-xl font-semibold text-gray-700 uppercase">
              {t('contactForm.title')}
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              {t('contactForm.description')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-700 mb-2 uppercase"
                >
                  {t('contactForm.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border    text-gray-700 text-sm focus:border-gray-600 focus:outline-none"
                  placeholder={t('contactForm.namePlaceholder')}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-2 uppercase"
                >
                  {t('contactForm.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border    text-gray-700 text-sm focus:border-gray-600 focus:outline-none"
                  placeholder={t('contactForm.emailPlaceholder')}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-semibold text-gray-700 mb-2 uppercase"
              >
                {t('contactForm.subject')}
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className="w-full p-2 border    text-gray-700 text-sm focus:border-gray-600 focus:outline-none"
              >
                <option value="">{t('contactForm.subjectPlaceholder')}</option>
                <option value="product-inquiry">
                  {t('contactForm.subjects.productInquiry')}
                </option>
                <option value="support">
                  {t('contactForm.subjects.support')}
                </option>
                <option value="partnership">
                  {t('contactForm.subjects.partnership')}
                </option>
                <option value="feedback">
                  {t('contactForm.subjects.feedback')}
                </option>
                <option value="other">{t('contactForm.subjects.other')}</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-gray-700 mb-2 uppercase"
              >
                {t('contactForm.message')}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={5}
                className="w-full p-2 border   text-gray-700 text-sm focus:border-gray-600 focus:outline-none resize-none"
                placeholder={t('contactForm.messagePlaceholder')}
              />
            </div>

            <div className="flex justify-start pt-4">
              <button
                type="submit"
                className="win7-btn text-stone-600 px-4 py-2 mr-4"
              >
                {t('contactForm.submit')}
              </button>
              <button
                type="button"
                onClick={() =>
                  setFormData({ name: '', email: '', subject: '', message: '' })
                }
                className="win7-btn text-stone-600 px-4 py-2"
              >
                {t('contactForm.clear')}
              </button>
            </div>
          </form>
        </div>
      </section>
    </BaseLayout>
  );
};

export default AboutUsPage;
