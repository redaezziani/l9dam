import { useTranslations } from 'next-intl';
import HeroSection from '../components/home/hero-section';
import BaseLayout from '../components/layout/base-layout';
import AnimatedBtn from '../components/retroui/animated-btn';
import Link from 'next/link';

export default function HomePage() {
  const t = useTranslations('HomePage');
  return (
    <BaseLayout>
      <Link href={'/store'} className=" fixed bottom-2 z-99999999">
        <img
          src={'/images/flip-animation.gif'}
          alt="flip-bu"
          className="w-28 h-28"
        />
      </Link>
      <HeroSection />
    </BaseLayout>
  );
}
