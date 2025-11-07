'use client';
import { useTranslations } from 'next-intl';
import LangSwitcher from '../header/lang-switcher';
import Navigation from '../header/navigation';

const Header = () => {
  const t = useTranslations('Common.Header');

  return (
    <section className="   z-50  top-0  w-full flex justify-center items-center">
      <header className="flex   flex-col pt-4 py-1  gap-6 w-full px-2 md:px-0 md:max-w-360 justify-start items-start">
        <span className="w-full flex justify-start px-4">
          <LangSwitcher />
        </span>
        <Navigation />
      </header>
    </section>
  );
};

export default Header;
