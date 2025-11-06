'use client';
import { useTranslations } from 'next-intl';
import LangSwitcher from '../header/lang-switcher';
import Navigation from '../header/navigation';

const Header = () => {
  const t = useTranslations('Common.Header');

  return (
    <section className=" bg-white  z-50 sticky top-0  w-full flex justify-center items-center">
      <header className="flex   flex-col pt-4 py-1 border-b border-neutral-300 gap-6 w-full px-4 md:px-0 max-w-360 justify-start items-start">
        <span className="w-full flex justify-end">
          <LangSwitcher />
        </span>
        <Navigation />
      </header>
    </section>
  );
};

export default Header;
