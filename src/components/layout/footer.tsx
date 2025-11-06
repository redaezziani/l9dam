'use client';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Instagram, MessageCircle } from 'lucide-react';

const Footer = () => {
  const t = useTranslations('Common.Footer');
  const tHeader = useTranslations('Common.Header');

  return (
    <footer className="w-full border-t border-neutral-300  bg-background/80 backdrop-blur-sm">
      <div className="max-w-360 mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">
              {t('language.title')}
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
              {t('company.title')}
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
              {t('legal.title')}
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
              className="group relative bg-primary text-white font-bold py-3 px-4 rounded-lg border-2 border-white shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl text-center"
            >
              <span className="relative z-10 text-sm uppercase tracking-wider">
                {tHeader('navLinks.home')}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>

            <Link
              href="/store"
              className="group relative bg-primary text-white font-bold py-3 px-4 rounded-lg border-2 border-white shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl text-center"
            >
              <span className="relative z-10 text-sm uppercase tracking-wider">
                {tHeader('navLinks.store')}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>

            <Link
              href="/distributors"
              className="group relative bg-primary text-white font-bold py-3 px-4 rounded-lg border-2 border-white shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl text-center"
            >
              <span className="relative z-10 text-sm uppercase tracking-wider">
                {tHeader('navLinks.distributors')}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>

            <Link
              href="/about"
              className="group relative bg-primary text-white font-bold py-3 px-4 rounded-lg border-2 border-white shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl text-center"
            >
              <span className="relative z-10 text-sm uppercase tracking-wider">
                {tHeader('navLinks.about')}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>

            <Link
              href="/contact"
              className="group relative bg-primary text-white font-bold py-3 px-4 rounded-lg border-2 border-white shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl text-center col-span-2"
            >
              <span className="relative z-10 text-sm uppercase tracking-wider">
                {tHeader('navLinks.contact')}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </nav>
        </div>

        <div className="mt-8 pt-6  border-t border-neutral-300 ">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <span className="text-sm text-red-500">{t('social.follow')}</span>
              <div className="flex gap-3">
                <a
                  href="https://instagram.com/lqdam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-blue-600 hover:bg-muted/80 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4 text-red-500 hover:text-foreground" />
                </a>
                <a
                  href="https://wa.me/your-whatsapp-number"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-blue-600 hover:bg-muted/80 transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4 text-red-500 hover:text-foreground" />
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
