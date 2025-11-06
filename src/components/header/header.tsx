'use client';
import { useTranslations } from 'next-intl';
import LangSwitcher from './lang-switcher';
import { IconMenu3 } from '@tabler/icons-react';
import { Button } from '../retroui/Button';
import Navigation from './navigation';

const Header = () => {
  const t = useTranslations('Common.Header');

  return (
   <section
   className=' fixed top-0 border-b border-border w-full flex justify-center items-center'
   >
     <header className="flex   flex-col py-4 gap-6 w-full px-4 md:px-0 max-w-360 justify-start items-start">
      <span className="w-full flex justify-end">
        <LangSwitcher />
      </span>
      <Navigation />
    </header>
   </section>
  );
};

export default Header;
