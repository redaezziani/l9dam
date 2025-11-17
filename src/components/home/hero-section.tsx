import { useTranslations } from 'next-intl';
import Link from 'next/link';

const HeroSection = () => {
  const t = useTranslations('HomePage');

  return (
    <section className="w-full md:max-w-360  pb-4 flex flex-col gap-6 px-4">
      <img src={'/images/app-logo-black.png'} alt="logo" className="w-32" />

      <div className="text-sm text-[#4a403a] pt-4 leading-relaxed space-y-2">
        <p>{t('hero.story.title')}</p>
        <p>{t('hero.story.intro')}</p>
        <p>{t('hero.story.collaboration')}</p>
        <p>{t('hero.story.qualities')}</p>
        <p>{t('hero.story.message')}</p>
        <Link
          href="/about-us"
          className="text-sm text-[#4a403aca] underline inline-block"
        >
          {t('hero.story.learnMore')}
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-6 md:justify-between">
        <span className="relative flex justify-center items-center max-w-96">
          <img src={'/images/home-page.png'} alt="product-preview" />
        </span>
      </div>

      <div className="text-sm text-[#4a403a] leading-relaxed space-y-2">
        <p>{t('hero.philosophy.intro')}</p>

        <p className="text-sm text-[#4a403a] leading-relaxed space-y-2">
          {t('hero.philosophy.design')}
        </p>

        <p>{t('hero.philosophy.simplicity')}</p>
        <p>{t('hero.philosophy.collaboration')}</p>
        <Link
          href="/about-us"
          className="text-sm text-[#4a403aca] underline inline-block"
        >
          {t('hero.philosophy.learnMore')}
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
