'use client';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

const Footer = () => {
  const t = useTranslations('Common.Footer');
  const tHeader = useTranslations('Common.Header');

  return (
    <footer className="w-full border-t border-[#b1aea1] bg-[#f9f8f517] backdrop-blur-sm">
      <div className="max-w-360 mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">
              {/* {t('language.title')} */}
            </h3>
            <div className="space-y-2">
              <Link
                href="?locale=en"
                className="block text-red-500 hover:text-foreground transition-colors"
              >
                {t('language.english')}
              </Link>
              <Link
                href="?locale=ar"
                className="block text-red-500 hover:text-foreground transition-colors"
              >
                {t('language.arabic')}
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">
              {/* {t('company.title')} */}
            </h3>
            <div className="space-y-2">
              <Link
                href="/contact"
                className="block text-red-500 hover:text-foreground transition-colors"
              >
                {t('company.contact')}
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">
              {/* {t('legal.title')} */}
            </h3>
            <div className="space-y-2">
              <Link
                href="/privacy-policy"
                className="block text-red-500 hover:text-foreground transition-colors"
              >
                {t('legal.privacy')}
              </Link>
              <Link
                href="/terms-conditions"
                className="block text-red-500 hover:text-foreground transition-colors"
              >
                {t('legal.terms')}
              </Link>
              <Link
                href="/shipping-returns"
                className="block text-red-500 hover:text-foreground transition-colors"
              >
                {t('legal.shipping')}
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Navigation - 90s Messi Style */}
        <div className="mt-8 pt-6 border-t border-neutral-300 md:hidden">
          <nav className="grid grid-cols-2 gap-4 mb-6">
            <Link
              href="/"
              className="group relative  text-primary   py-3 px-4  border border-[#b1aea1] "
            >
              <span className="relative z-10 text-primary  text-sm uppercase">
                {tHeader('navLinks.home')}
              </span>
            </Link>

            <Link
              href="/store"
              className="group relative  text-primary   py-3 px-4  border border-[#b1aea1] "
            >
              <span className="relative z-10 text-primary   text-sm uppercase">
                {tHeader('navLinks.store')}
              </span>
            </Link>

            <Link
              href="/distributors"
              className="group relative  text-primary   py-3 px-4  border border-[#b1aea1] "
            >
              <span className="relative z-10 text-primary  text-sm uppercase">
                {tHeader('navLinks.distributors')}
              </span>
            </Link>

            <Link
              href="/about"
              className="group relative  text-primary   py-3 px-4  border border-[#b1aea1] "
            >
              <span className="relative z-10 text-primary  text-sm uppercase">
                {tHeader('navLinks.about')}
              </span>
            </Link>

            <Link
              href="/contact"
              className="group relative  text-primary   py-3 px-4  border border-[#b1aea1]  col-span-2"
            >
              <span className="relative z-10 text-primary  text-sm uppercase">
                {tHeader('navLinks.contact')}
              </span>
            </Link>
          </nav>
        </div>

        <div className="mt-8 pt-6  border-t border-neutral-300 ">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <span className="text-sm text-red-500 font-bold uppercase">
                {t('social.follow')}
              </span>
              <div className="flex flex-wrap gap-2">
                <a
                  href="https://instagram.com/lqdam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-2 py-1  "
                  aria-label={t('social.instagram')}
                >
                  <img
                    className="w-8"
                    src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                    alt="Instagram"
                  />
                  <span>{t('social.instagram')}</span>
                </a>
                <a
                  href="https://wa.me/your-whatsapp-number"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-2 py-1  "
                  aria-label={t('social.whatsapp')}
                >
                  <img
                    className="w-8"
                    src="https://www.freeiconspng.com/thumbs/logo-whatsapp-png/logo-whatsapp-png-image-2.png"
                    alt="WhatsApp"
                  />
                  <span>{t('social.whatsapp')}</span>
                </a>
                <a
                  href="https://tiktok.com/@lqdam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-2 py-1  "
                  aria-label={t('social.tiktok')}
                >
                  <img
                    className="w-12"
                    src="https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg"
                    alt="TikTok"
                  />
                  <span>{t('social.tiktok')}</span>
                </a>
              </div>
            </div>

            <div className="text-sm text-red-500 text-center md:text-right">
              <p>
                © {new Date().getFullYear()} {t('copyright.company')}.{' '}
                {t('copyright.rights')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
