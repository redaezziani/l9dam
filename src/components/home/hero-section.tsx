import { useTranslations } from 'next-intl';
import Link from 'next/link';

const HeroSection = () => {
  const t = useTranslations('HomePage');

  return (
    <section className="w-full md:max-w-360 py-4 flex flex-col gap-6 px-4">
      <div className="text-sm text-[#4a403a] leading-relaxed space-y-4">
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
          <img src={'/images/slider/image-2.png'} alt="product-preview" />
        </span>
      </div>

      <div className="text-sm text-[#4a403a] leading-relaxed space-y-4">
        <p>{t('hero.philosophy.intro')}</p>

        <p
          dangerouslySetInnerHTML={{
            __html: t('hero.philosophy.design')
              .replace(
                '"National Shoe"',
                '<span class="bg-amber-300 h-1 px-1 ">"National Shoe"</span>',
              )
              .replace(
                '"الحذاء الوطني"',
                '<span class="bg-amber-300 h-1 px-1 ">"الحذاء الوطني"</span>',
              ),
          }}
        />

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
