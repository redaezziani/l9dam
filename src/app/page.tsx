'use client';
import { useLocale, useTranslations } from 'next-intl';
import HeroSection from '../components/ui/hero-section';
import BaseLayout from '../components/layout/base-layout';
import Link from 'next/link';

export default function HomePage() {
  const t = useTranslations('HomePage');
  const local = useLocale();
  return (
    <BaseLayout>
      <Link href={'/store'} className=" fixed bottom-2 z-99999999">
        <img
          src={`/images/flip-animation-${local}.gif`}
          alt="flip-bu"
          className="w-28 pixelated h-28"
        />
      </Link>
      <HeroSection />
    </BaseLayout>
  );
}
