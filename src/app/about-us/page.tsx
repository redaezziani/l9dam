'use client';
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import BaseLayout from '../../components/layout/base-layout';

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
    // Handle form submission here
    console.log('Form submitted:', formData);
    // You can add actual form submission logic here
  };

  return (
    <BaseLayout>
      <section className="w-full max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="border-2 border-gray-400 bg-gray-100 p-4 mb-6">
          <h1 className="text-2xl font-bold uppercase text-gray-800 mb-2">
            {t('title')}
          </h1>
          <div className="h-1 bg-gray-400"></div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Column - Main Info */}
          <div className="flex-2 space-y-6">
            <div className="border border-gray-400 bg-white p-4">
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

            <div className="border border-gray-400 bg-white p-4">
              <h2 className="text-lg font-semibold mb-3 text-gray-700 uppercase">
                {t('mission.title')}
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                {t('mission.content')}
              </p>
            </div>
          </div>

          {/* Right Column - Quick Info */}
          <div className="flex-1 space-y-4">
            <div className="border border-gray-400 bg-gray-50 p-4">
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

            <div className="border border-gray-400 bg-gray-50 p-4">
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

        {/* Contact Form Section */}
        <div className="mt-8 border border-gray-400 bg-white p-6">
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
                  className="w-full p-2 border-2 border-gray-400 bg-white text-gray-700 text-sm focus:border-gray-600 focus:outline-none"
                  placeholder={t('contactForm.namePlaceholder')}
                />
              </div>

              {/* Email Field */}
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
                  className="w-full p-2 border-2 border-gray-400 bg-white text-gray-700 text-sm focus:border-gray-600 focus:outline-none"
                  placeholder={t('contactForm.emailPlaceholder')}
                />
              </div>
            </div>

            {/* Subject Field */}
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
                className="w-full p-2 border-2 border-gray-400 bg-white text-gray-700 text-sm focus:border-gray-600 focus:outline-none"
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

            {/* Message Field */}
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
                className="w-full p-2 border-2 border-gray-400 bg-white text-gray-700 text-sm focus:border-gray-600 focus:outline-none resize-none"
                placeholder={t('contactForm.messagePlaceholder')}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-start pt-4">
              <button
                type="submit"
                className="win7-btn text-stone-600 px-6 py-2"
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

        {/* Bottom Section */}
        <div className="mt-8 border border-gray-400 bg-white p-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 uppercase mb-2">
                {t('getInTouch.title')}
              </h3>
              <p className="text-sm text-gray-600">
                {t('getInTouch.description')}
              </p>
            </div>
            <div className="flex gap-2">
              <button className="win7-btn text-stone-600" type="button">
                {t('getInTouch.contactButton')}
              </button>
              <button className="win7-btn text-stone-600" type="button">
                {t('getInTouch.productsButton')}
              </button>
            </div>
          </div>
        </div>

        {/* Retro Footer Element */}
        <div className="mt-6 text-center">
          <div className="inline-block border border-gray-400 bg-gray-200 px-4 py-2">
            <p className="text-xs text-gray-500 -rotate-1">"{t('motto')}"</p>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
};

export default AboutUsPage;
