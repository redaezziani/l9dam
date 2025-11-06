'use client';
import { useTranslations } from 'next-intl';
import LangSwitcher from './lang-switcher';
import { IconMenu3 } from '@tabler/icons-react';
import { Button } from '../retroui/Button';

const Header = () => {
  const t = useTranslations('Common.Header');

  return (
    <header className="flex flex-col py-4 gap-6 w-full px-4 md:px-0 max-w-360 justify-start items-start">
      <span className="w-full flex justify-end">
        <LangSwitcher />
      </span>
      <div className="flex w-full justify-between items-center">

        <span className=" size-16 rounded-full bg-muted"></span>
        <nav className=" hidden md:flex gap-4 items-center">
          <a href="#home" className="hover:underline">
            {t('navLinks.home')}
          </a>
          <a href="#store" className="hover:underline">
            {t('navLinks.store')}
          </a>
          <a href="#distributors" className="hover:underline">
            {t('navLinks.distributors')}
          </a>
          <a href="#about" className="hover:underline">
            {t('navLinks.about')}
          </a>
          <a href="#contact" className="hover:underline">
            {t('navLinks.contact')}
          </a>
        </nav>
        <Button className=" md:hidden" variant={'outline'} size={'icon'}>
          <IconMenu3 />
        </Button>
        <span className=" size-16 rounded-full bg-muted"></span>
      </div>
    </header>
  );
};

export default Header;
