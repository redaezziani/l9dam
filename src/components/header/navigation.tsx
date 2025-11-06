import React from 'react';
import { useTranslations } from 'next-intl';
import MobilMenu from './mobil-menu';
import Link from 'next/link';
const Navigation = () => {
  const t = useTranslations('Common.Header');
  return (
    <div className="flex w-full justify-between items-end">
      <span className=" flex w-28 h-28 rounded-full p-1 bg-red-700 text-white justify-center items-center font-bold text-2xl md:text-3xl">
        <span className=" flex justify-center items-center border border-white/80 rounded-full w-full h-full">
          <p className=" font-bold">{t('brandName')}</p>
        </span>
      </span>

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
