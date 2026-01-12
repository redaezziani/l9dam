'use client';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { startTransition } from 'react';
import Link from 'next/link';

const Footer = () => {
  const t = useTranslations('Common.Footer');
  const tHeader = useTranslations('Common.Header');
  const tLang = useTranslations('Common.Header.langSwitcher');

  const locale = useLocale();
  const router = useRouter();

  const targetLocale = locale === 'en' ? 'ar' : 'en';
  const displayLangText = tLang(targetLocale);

  const handleLanguageChange = () => {
    document.cookie = `NEXT_LOCALE=${targetLocale}; path=/; max-age=31536000`;
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <footer className="w-full pb-24 relative z-9999 border-t border-[#4a403a]/10">
      <div className="max-w-360 mx-auto px-6 py-8">
        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 mb-8">
          <Link
            href="/"
            className={`text-[#4a403a]/80 hover:text-[#4a403a] transition-colors ${locale === 'en' ? 'text-xs' : 'text-sm'} capitalize`}
          >
            {tHeader('navLinks.home')}
          </Link>
          <Link
            href="/store"
            className={`text-[#4a403a]/80 hover:text-[#4a403a] transition-colors ${locale === 'en' ? 'text-xs' : 'text-sm'} capitalize`}
          >
            {tHeader('navLinks.store')}
          </Link>
          <Link
            href="/partners"
            className={`text-[#4a403a]/80 hover:text-[#4a403a] transition-colors ${locale === 'en' ? 'text-xs' : 'text-sm'} capitalize`}
          >
            {tHeader('navLinks.distributors')}
          </Link>
          <Link
            href="/about-us"
            className={`text-[#4a403a]/80 hover:text-[#4a403a] transition-colors ${locale === 'en' ? 'text-xs' : 'text-sm'} capitalize`}
          >
            {tHeader('navLinks.about')}
          </Link>
        </nav>

        {/* Social Media */}
        <div className="flex justify-center gap-4 mb-8">
          <a
            href="https://www.instagram.com/lqdam_shoes"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('social.instagram')}
            className="opacity-80 hover:opacity-100 transition-opacity"
          >
            <img
              className="w-12 pixelated"
              src="/images/footer/new-images/i.png"
              alt="Instagram"
            />
          </a>
          <a
            href="https://wa.me/your-whatsapp-number"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('social.whatsapp')}
            className="opacity-80 hover:opacity-100 transition-opacity"
          >
            <img
              className="w-12 pixelated"
              src="/images/footer/new-images/w.png"
              alt="WhatsApp"
            />
          </a>
          <a
            href="https://www.tiktok.com/@lqdam_shoes"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('social.tiktok')}
            className="opacity-80 hover:opacity-100 transition-opacity"
          >
            <img
              className="w-12 pixelated"
              src="/images/footer/new-images/t.png"
              alt="TikTok"
            />
          </a>
        </div>

        {/* Legal Links */}
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 mb-6">
          <Link
            href="/privacy-policy"
            className={`text-[#4a403a]/70 hover:text-[#4a403a] transition-colors ${locale === 'en' ? 'text-xs' : 'text-sm'} capitalize`}
          >
            {t('legal.privacy')}
          </Link>
          <Link
            href="/terms-of-service"
            className={`text-[#4a403a]/70 hover:text-[#4a403a] transition-colors ${locale === 'en' ? 'text-xs' : 'text-sm'} capitalize`}
          >
            {t('legal.terms')}
          </Link>
          <Link
            href="/shipping-returns"
            className={`text-[#4a403a]/70 hover:text-[#4a403a] transition-colors ${locale === 'en' ? 'text-xs' : 'text-sm'} capitalize`}
          >
            {t('legal.shipping')}
          </Link>
          <Link
            href="/size-guide"
            className={`text-[#4a403a]/70 hover:text-[#4a403a] transition-colors ${locale === 'en' ? 'text-xs' : 'text-sm'} capitalize`}
          >
            {tHeader('navLinks.sizeGuide')}
          </Link>
          <div
            onClick={handleLanguageChange}
            className={`text-[#4a403a]/70 hover:text-[#4a403a] transition-colors cursor-pointer select-none ${locale === 'en' ? 'text-xs' : 'text-sm'} capitalize`}
          >
            {displayLangText}
          </div>
        </div>

        {/* Copyright */}
        <div className={`text-center ${locale === 'en' ? 'text-xs' : 'text-sm'} text-[#4a403a]/60 pt-6 border-t border-[#4a403a]/10`}>
          <p>
            © {new Date().getFullYear()} {t('copyright.company')} -{' '}
            {t('copyright.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
