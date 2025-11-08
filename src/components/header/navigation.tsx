import { useTranslations } from 'next-intl';
import Link from 'next/link';
const Navigation = () => {
  const t = useTranslations('Common.Header');
  return (
    <div className="flex w-full px-4 justify-between items-center">
      <div className="flex max-w-[70%] md:max-w-[90%] w-full flex-col gap-1">
        <div className="flex w-full justify-between">
          <img
            src="/images/header-img.gif"
            alt="Brand Name"
            className=" w-60 "
          />
        </div>

        <nav className="  border-t py-2 border-[#b1aea1] font-semibold text-[#b1aea1]  text-sm w-full flex gap-2 md:gap-20 items-center">
          <Link href="/" className="hover:underline underline">
            {t('navLinks.home')}
          </Link>
          <Link href="/store" className="hover:underline">
            {t('navLinks.store')}
          </Link>
          <Link href="/distributors" className="hover:underline">
            {t('navLinks.distributors')}
          </Link>
          <Link href="/about" className="hover:underline">
            {t('navLinks.about')}
          </Link>
        </nav>
      </div>

      <img
        src="/images/flip.gif"
        alt="Brand Flip Icon"
        className=" w-24 pixelated "
      />
    </div>
  );
};

export default Navigation;
