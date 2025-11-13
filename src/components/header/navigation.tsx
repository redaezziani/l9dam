'use client';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navigation = () => {
  const t = useTranslations('Common.Header');
  const pathname = usePathname();

  const links = [
    { href: '/', label: t('navLinks.home') },
    { href: '/store', label: t('navLinks.store') },
    { href: '/distributors', label: t('navLinks.distributors') },
    { href: '/about-us', label: t('navLinks.about') },
    { href: '/cart', label: t('navLinks.cart') },
  ];

  return (
    <div className="flex w-full px-4 justify-between items-center">
      <div className="flex max-w-[70%] md:max-w-[90%] w-full flex-col gap-1">
        <div className="flex w-full justify-between">
          <img src="/images/header-img.gif" alt="Brand Name" className="w-60" />
        </div>

        <nav className="border-t py-2 border-[#b1aea1] font-semibold text-[#b1aea1] text-sm w-full flex gap-2 md:gap-20 items-center">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`hover:underline ${
                pathname === href ? 'underline text-primary' : ''
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>

      <img
        src="/images/flip-logo.gif"
        alt="Brand Flip Icon"
        className="w-24 pixelated"
      />
    </div>
  );
};

export default Navigation;
