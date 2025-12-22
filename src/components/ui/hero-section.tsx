'use client';
import { useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { api } from '../../lib/utils';

interface HomepageData {
  id: number;
  documentId: string;
  title: string;
  metaDescription: string;
  content: string;
  locale: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

const HeroSection = () => {
  const locale = useLocale();
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHomepageData = async () => {
      try {
        setIsLoading(true);
        const res = await api.get('/api/homepage', {
          params: {
            locale: locale,
          },
        });

        const homepageData: HomepageData = res.data.data;
        setContent(homepageData.content || '');
      } catch (error) {
        console.error('Error fetching homepage data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHomepageData();
  }, [locale]);

  if (isLoading) {
    return (
      <section className="w-full text-center md:max-w-360  pb-4 flex flex-col gap-6 px-4">
        <div className="flex w-full justify-center items-center ">
          <img src={'/images/app-logo-black.png'} alt="logo" className="w-32" />
        </div>
        <div className="text-sm text-[#4a403a] pt-4">Loading...</div>
      </section>
    );
  }

  return (
    <section className="w-full text-center md:max-w-360  pb-4 flex flex-col gap-6 px-4">
      <div className="flex w-full justify-center items-center ">
        <img src={'/images/app-logo-black.png'} alt="logo" className="w-32" />
      </div>

      <div className="prose prose-sm max-w-none text-[#4a403a] pt-4">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </section>
  );
};

export default HeroSection;
