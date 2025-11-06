'use client';
import { useTranslations } from 'next-intl';
import BaseLayout from '../components/layout/base-layout';
import { RadioGroup } from '../components/retroui/Radio';
import Link from 'next/link';

export default function HomePage() {
  const t = useTranslations('HomePage');

  return (
    <BaseLayout>
      <section className="w-full  md:max-w-360 md:justify-between flex flex-col md:flex-row gap-6  px-4">
        <section className=" w-full flex-1 flex justify-center items-center">
          <span className=" w-108 h-128 rounded-md bg-neutral-200 " />
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
          <p className="text-sm  -rotate-[2deg] mt-6">
            {t('product.description')}
          </p>

          <div className="flex gap-2 justify-start items-center mt-6">
            <input
              className="win7-btn"
              type="button"
              value={t('product.addToCart')}
            />

            <div className="clear"></div>
            <Link href="/about" className="text-sm  text-white underline">
              {t('product.moreDetails')}
            </Link>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}
