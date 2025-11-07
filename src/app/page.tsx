'use client';
import { useTranslations } from 'next-intl';
import BaseLayout from '../components/layout/base-layout';
import { RadioGroup } from '../components/retroui/Radio';
import Link from 'next/link';

export default function HomePage() {
  const t = useTranslations('HomePage');

  const images = ['/images/img1.jpg', '/images/img2.jpg', '/images/img3.jpg'];

  return (
    <BaseLayout>
      <section className="w-full  md:max-w-360 md:justify-between flex flex-col md:flex-row gap-6  px-4">
        <section className=" max-w-96 max-h-[30rem] old-scrollbar bg-[#b1aea1] border-[#b1aea1] border  overflow-y-scroll flex flex-col items-center gap-4 old-scrollbar p-2">
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Product Image ${index + 1}`}
              className="max-w-full"
            />
          ))}
        </section>
        <div className=" flex flex-2 flex-col gap-4  ">
          <h1 className=" text-2xl md:max-w-96 font-bold  uppercase">
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
                  className=" bg-black"
                  variant="default"
                />
                <RadioGroup.Item
                  value="white"
                  className=" bg-white"
                  variant="default"
                />
              </div>
            </RadioGroup>
          </div>
          <p className="text-sm text-[#b1aea1]  -rotate-[2deg] mt-6">
            {t('product.description')}
          </p>

          <div className="flex gap-2 justify-start  items-center mt-6">
            <button className="win7-btn h-6 text-stone-600" type="button">
              {t('product.addToCart')}
            </button>

            <div className="clear"></div>
            <Link href="/about" className="text-sm text-stone-400   underline">
              {t('product.moreDetails')}
            </Link>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}
