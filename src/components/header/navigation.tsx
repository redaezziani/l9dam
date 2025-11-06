import React from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import BrandFlip from './brand-flip';
const Navigation = () => {
  const t = useTranslations('Common.Header');
  return (
    <div className="flex w-full justify-between items-end">
      <BrandFlip t={t} />

      <nav className=" hidden md:flex gap-20 items-center">
        <Link href="/" className="hover:underline underline">
          {t('navLinks.home')}
        </Link>
        <Link href="7store" className="hover:underline">
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
      <img
        src="https://i.gifer.com/XqyS.gif"
        alt="Animated Icon"
        className=" h-14 md:h-20 "
      />
    </div>
  );
};

export default Navigation;
