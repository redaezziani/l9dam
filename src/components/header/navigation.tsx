import React from 'react';
import { useTranslations } from 'next-intl';
import MobilMenu from './mobil-menu';
import Link from 'next/link';
const Navigation = () => {
  const t = useTranslations('Common.Header');
  return (
    <div className="flex w-full justify-between items-end">
      <div className=" hidden md:flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 160"
          className="h-11 w-11"
        >
          <path
            fill="currentColor"
            d="M 75.36,45.39 C 80.93,35.58 86.31,26.09 92.56,15.10 C 119.73,63.00 145.09,109.48 170.40,155.88 C 169.04,157.80 167.65,157.30 166.40,157.30 C 151.24,157.35 136.08,157.24 120.92,157.43 C 118.89,157.47 117.64,156.09 116.65,153.63 C 99.72,120.88 82.67,88.19 65.56,55.54 C 64.37,53.63 64.13,52.28 65.39,50.29 C 68.18,45.21 70.61,39.92 75.36,45.39 Z"
          />
          <path
            fill="currentColor"
            d="M 15.00,157.32 C 9.54,157.33 4.58,157.33 -1.22,157.33 C 9.28,138.97 19.04,121.87 29.59,103.42 C 40.12,121.82 50.84,138.85 62.40,157.32 C 49.61,157.32 38.56,157.32 15.00,157.32 Z"
          />
        </svg>
      </div>

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
