'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import Link from 'next/link';
import { RadioGroup } from '../retroui/Radio';
const HeroSection = () => {
  const t = useTranslations('HomePage');

  return (
    <section className="w-full md:max-w-360 md:justify-between flex flex-col md:flex-row gap-6 px-4">
      <ImageSlider />
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
  );
};

const ImageSlider = () => {
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
    <section className="relative max-w-96  border">
      <div
        ref={scrollRef}
        className="overflow-x-scroll old-scrollbar flex gap-4 w w-full snap-x snap-mandatory"
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Product Image ${index + 1}`}
            className="w-full shrink-0 snap-center"
          />
        ))}
      </div>
      <button
        onClick={scrollLeft}
        className="absolute left-1 top-1/2 win7-btn -translate-y-1/2 bg-[#b1aea1] border border-[#b1aea1] p-2 hover:bg-[#b1aea1]"
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
        className="absolute right-1 win7-btn top-1/2 -translate-y-1/2 bg-[#b1aea1] border border-[#b1aea1] p-2 hover:bg-[#b1aea1]"
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
  );
};
export default HeroSection;
