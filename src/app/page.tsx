import { useTranslations } from 'next-intl';
import HeroSection from '../components/home/hero-section';
import BaseLayout from '../components/layout/base-layout';
import AnimatedBtn from '../components/retroui/animated-btn';

export default function HomePage() {
  const t = useTranslations('HomePage');
  return (
    <BaseLayout>
      <div className=" fixed bottom-4 z-99999999">
        <AnimatedBtn>{t('product.addToCart')}</AnimatedBtn>
      </div>
      <HeroSection />
    </BaseLayout>
  );
}
