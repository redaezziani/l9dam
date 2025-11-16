'use client';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LangSwitcher from './lang-switcher';

const Navigation = () => {
  const t = useTranslations('Common.Header');
  const pathname = usePathname();

  const links = [
    { href: '/', label: t('navLinks.home') },
    { href: '/about-us', label: t('navLinks.about') },
  ];

  return (
    <div className="flex border-[#4a403a55] border-b w-full   justify-between items-center">
      <div className="flex  w-52 flex-col gap-1">
        <nav className=" py-2  font-semibold text-[#4a403a] text-sm w-full flex gap-6 md:gap-20 items-center">
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
      <span className=" flex gap-2 items-center">
        <Link href="/cart">
          {' '}
          <svg
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="20"
            height="20"
          >
            {' '}
            <path
              d="M2 2h4v4h16v11H4V4H2V2zm4 13h14V8H6v7zm0 4h3v3H6v-3zm14 0h-3v3h3v-3z"
              fill="currentColor"
            />{' '}
          </svg>{' '}
        </Link>
        {'/'}
        <LangSwitcher />
      </span>
    </div>
  );
};

export default Navigation;
