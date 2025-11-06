'use client';
import { useTranslations } from 'next-intl';
import BaseLayout from '../components/layout/base-layout';
import { Button } from '../components/retroui/Button';
import { RadioGroup } from '../components/retroui/Radio';

export default function HomePage() {
  const t = useTranslations('HomePage');

  return (
    <BaseLayout>
      <section className="w-full  md:max-w-360 md:justify-between flex flex-col md:flex-row gap-6  px-4">
        <div className=" flex flex-col gap-4  ">
          <h1 className=" text-5xl md:max-w-96 font-bold  uppercase">
            {t('product.title')}
          </h1>
          <p className="text-sm text-green-500 leading-relaxed">
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
          <p className="text-sm ">{t('product.description')}</p>

          <div className="flex gap-2 mt-6">
            <Button variant="default">{t('product.addToCart')}</Button>
            <Button variant="link">{t('product.moreDetails')}</Button>
          </div>
        </div>

        <section className=" w-full flex justify-center items-center">
          <span className=" w-108 h-128 rounded-md bg-neutral-200 " />
        </section>
      </section>
    </BaseLayout>
  );
}
