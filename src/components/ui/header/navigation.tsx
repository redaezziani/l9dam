'use client';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LangSwitcher from './lang-switcher';
import { useCartStore } from '@/src/store/cart-store';

const Navigation = () => {
  const t = useTranslations('Common.Header');
  const pathname = usePathname();

  const links = [
    { href: '/', label: t('navLinks.home') },
    { href: '/about-us', label: t('navLinks.about') },
    { href: '/store', label: t('navLinks.store') },
    { href: '/partners', label: t('navLinks.partners') },
  ];

  const cartCount = useCartStore((s) =>
    s.items.reduce((acc, it) => acc + it.quantity, 0),
  );

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
      <span className=" flex gap-4 justify-end  items-end">
        <Link href="/cart">
          <div className="relative">
            <img src={'/images/cart.png'} alt="cart" className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-primary text-white  text-xs w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
        </Link>
        <p className="text-gray-400">|</p>
        <LangSwitcher />
      </span>
    </div>
  );
};

export default Navigation;
