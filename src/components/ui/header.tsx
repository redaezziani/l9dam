'use client';
import { useTranslations } from 'next-intl';
import Navigation from './header/navigation';

const Header = () => {
  const t = useTranslations('Common.Header');

  return (
    <section className="   z-9999 relative    top-0  w-full flex justify-center items-center">
      <header className="flex   flex-col pt-4 py-1  gap-6 w-full px-4 md:px-0 md:max-w-360 justify-start items-start">
        <Navigation />
        <div className="flex justify-between w-full">
          <img
            src="/images/header-img.gif"
            alt="Brand Name"
            className="w-full h-30"
          />
        </div>
      </header>
    </section>
  );
};

export default Header;
