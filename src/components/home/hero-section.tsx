import { useTranslations } from 'next-intl';
import Link from 'next/link';
import ImageSlider from './image-slider';
const HeroSection = () => {
  const t = useTranslations('HomePage');

  return (
    <section className="w-full md:max-w-360 md:justify-between flex flex-col md:flex-row gap-6 px-4">
      <ImageSlider />
      <div className="flex flex-2 flex-col gap-4">
        <p className="text-sm text-[#b1aea1] ">{t('product.description')}</p>
        <div className=" flex gap-3 justify-start items-center mt-6">
          <Link
            href=""
            className="text-sm text-stone-600 hover:text-primary underline"
          >
            {t('product.addToCart')}
          </Link>

          <Link href="/about" className="text-sm text-stone-400 underline">
            {t('product.moreDetails')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
