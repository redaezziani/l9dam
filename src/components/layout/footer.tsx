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
    <footer className="w-full pb-24 relative z-9999 border-t-2 border-[#4a403a]/20">
      <div className="max-w-360 mx-auto px-4 py-6">
        {/* Navigation Links (No change) */}
        <nav className="flex flex-wrap justify-center gap-4 mb-6">
          <Link
            href="/"
            className="text-[#4a403a] hover:underline text-sm uppercase font-medium"
          >
            {tHeader('navLinks.home')}
          </Link>
          <span className="text-[#4a403a]">•</span>
          <Link
            href="/store"
            className="text-[#4a403a] hover:underline text-sm uppercase font-medium"
          >
            {tHeader('navLinks.store')}
          </Link>
          <span className="text-[#4a403a]">•</span>
          <Link
            href="/distributors"
            className="text-[#4a403a] hover:underline text-sm uppercase font-medium"
          >
            {tHeader('navLinks.distributors')}
          </Link>
          <span className="text-[#4a403a]">•</span>
          <Link
            href="/about"
            className="text-[#4a403a] hover:underline text-sm uppercase font-medium"
          >
            {tHeader('navLinks.about')}
          </Link>
          <span className="text-[#4a403a]">•</span>
          <Link
            href="/contact"
            className="text-[#4a403a] hover:underline text-sm uppercase font-medium"
          >
            {tHeader('navLinks.contact')}
          </Link>
        </nav>

        {/* Social Media (No change) */}
        <div className="flex justify-center gap-2 mb-6">
          <a
            href="https://instagram.com/lqdam"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('social.instagram')}
          >
            <img
              className="w-16 pixelated hover:opacity-80 transition-opacity"
              src="/images/footer/instagram.gif"
              alt="Instagram"
            />
          </a>
          <a
            href="https://wa.me/your-whatsapp-number"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('social.whatsapp')}
          >
            <img
              className="w-16 pixelated hover:opacity-80 transition-opacity"
              src="/images/footer/whats.gif"
              alt="WhatsApp"
            />
          </a>
          <a
            href="https://tiktok.com/@lqdam"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('social.tiktok')}
          >
            <img
              className="w-24 pixelated hover:opacity-80 transition-opacity"
              src="/images/footer/tik.gif"
              alt="TikTok"
            />
          </a>
        </div>

        {/* Legal & Language Links - MODIFIED */}
        <div className="flex flex-wrap justify-center gap-3 text-xs mb-4">
          <Link
            href="/privacy-policy"
            className="text-[#4a403a] hover:underline"
          >
            {t('legal.privacy')}
          </Link>
          <span className="text-[#4a403a]">•</span>
          <Link
            href="/terms-conditions"
            className="text-[#4a403a] hover:underline"
          >
            {t('legal.terms')}
          </Link>
          <span className="text-[#4a403a]">•</span>
          <Link
            href="/shipping-returns"
            className="text-[#4a403a] hover:underline"
          >
            {t('legal.shipping')}
          </Link>
          <span className="text-[#4a403a]">•</span>

          {/* Single Language Switcher (replicated from LangSwitcher.js logic) */}
          <div
            onClick={handleLanguageChange}
            className="text-[#4a403a] hover:underline cursor-pointer select-none uppercase"
          >
            {displayLangText}
          </div>
        </div>

        {/* Copyright (No change) */}
        <div className="text-center text-xs text-[#4a403a] border-t border-[#4a403a55] pt-4">
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
