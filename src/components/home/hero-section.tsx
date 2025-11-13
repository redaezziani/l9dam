'use client';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import AnimatedBtn from '../retroui/animated-btn';
const HeroSection = () => {
  const t = useTranslations('HomePage');

  return (
    <section className="w-full md:max-w-360 md:justify-between flex flex-col md:flex-row gap-6 px-4">
      <span className=" relative max-w-96">
        <img src={'/images/slider/image-2.png'} alt="product-preview" />
      </span>
      <div className="flex flex-2 flex-col gap-4">
        <p className="text-sm text-[#b1aea1] font-semibold leading-relaxed ">
          {t('product.description')}
        </p>
        <div className=" flex gap-3 justify-start items-center mt-6">
          <AnimatedBtn>{t('product.addToCart')}</AnimatedBtn>
          <Link href="/about-us" className="text-sm text-stone-400 underline">
            {t('product.moreDetails')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
