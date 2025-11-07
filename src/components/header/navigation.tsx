import React from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import BrandFlip from './brand-flip';
const Navigation = () => {
  const t = useTranslations('Common.Header');
  return (
    <div className="flex w-full px-4 justify-between items-end">
      <div className="flex w-full flex-col gap-1">
        <img src="/images/logo.jpg" alt="Animated Icon" className=" w-28 " />

        <nav className="  border-t py-2 border-neutral-400 font-medium text-neutral-400  text-sm w-full md:flex gap-2 md:gap-20 items-center">
          <Link href="/" className="hover:underline underline">
            {t('navLinks.home')}
          </Link>
          <Link href="/store" className="hover:underline">
            {t('navLinks.store')}
          </Link>
          <Link href="/distributors" className="hover:underline">
            {t('navLinks.distributors')}
          </Link>
          <Link href="/about" className="hover:underline">
            {t('navLinks.about')}
          </Link>
          <Link href="/contact" className="hover:underline">
            {t('navLinks.contact')}
          </Link>
        </nav>
      </div>
      <BrandFlip t={t} />
    </div>
  );
};

export default Navigation;
