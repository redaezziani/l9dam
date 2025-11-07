'use client';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import BaseLayout from '../components/layout/base-layout';
import { RadioGroup } from '../components/retroui/Radio';
import Link from 'next/link';

export default function HomePage() {
  const t = useTranslations('HomePage');
  const images = ['/images/img1.jpg', '/images/img2.jpg', '/images/img3.jpg'];
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <BaseLayout>
      <section className="w-full md:max-w-360 md:justify-between flex flex-col md:flex-row gap-6 px-4">
        <section className="relative max-w-96 bg-[#b1aea1]/20 border-[#b1aea1] border p-2">
          <div
            ref={scrollRef}
            className="overflow-x-scroll old-scrollbar flex gap-4 snap-x snap-mandatory"
          >
            {images.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Product Image ${index + 1}`}
                className="h-96 flex-shrink-0 snap-center"
              />
            ))}
          </div>
          <button
            onClick={scrollLeft}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#b1aea1]/80 border border-[#b1aea1] p-2 hover:bg-[#b1aea1]"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={scrollRight}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#b1aea1]/80 border border-[#b1aea1] p-2 hover:bg-[#b1aea1]"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </section>
        <div className="flex flex-2 flex-col gap-4">
          <h1 className="text-2xl md:max-w-96 font-bold uppercase">
            {t('product.title')}
          </h1>
          <p className="text-sm underline text-green-600 leading-relaxed">
            {t('product.inStock')}
          </p>
          <div className="flex gap-2 items-baseline">
            <span className="text-lg font-semibold">
              {t('product.price')}: 299
            </span>
            <span className="text-sm font-medium">{t('product.unit')}</span>
          </div>
          <div className="flex">
            <RadioGroup>
              <div className="flex items-center space-x-2">
                <RadioGroup.Item
                  value="black"
                  className="bg-black"
                  variant="default"
                />
                <RadioGroup.Item
                  value="white"
                  className="bg-white"
                  variant="default"
                />
              </div>
            </RadioGroup>
          </div>
          <p className="text-sm text-[#b1aea1] -rotate-[2deg] mt-6">
            {t('product.description')}
          </p>
          <div className="flex gap-2 justify-start items-center mt-6">
            <button className="win7-btn h-6 text-stone-600" type="button">
              {t('product.addToCart')}
            </button>
            <div className="clear"></div>
            <Link href="/about" className="text-sm text-stone-400 underline">
              {t('product.moreDetails')}
            </Link>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}
