'use client';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Instagram, MessageCircle } from 'lucide-react';

const Footer = () => {
  const t = useTranslations('Common.Footer');

  return (
    <footer className="w-full border-t border-border bg-background/80 backdrop-blur-sm">
      <div className="max-w-360 mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">
              {t('language.title')}
            </h3>
            <div className="space-y-2">
              <Link
                href="?locale=en"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                {t('language.english')}
              </Link>
              <Link
                href="?locale=ar"
                className="block text-muted-foreground hover:text-foreground transition-colors"
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
                className="block text-muted-foreground hover:text-foreground transition-colors"
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
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                {t('legal.privacy')}
              </Link>
              <Link
                href="/terms-conditions"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                {t('legal.terms')}
              </Link>
              <Link
                href="/shipping-returns"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                {t('legal.shipping')}
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {t('social.follow')}
              </span>
              <div className="flex gap-3">
                <a
                  href="https://instagram.com/lqdam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                </a>
                <a
                  href="https://wa.me/your-whatsapp-number"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                </a>
              </div>
            </div>

            <div className="text-sm text-muted-foreground text-center md:text-right">
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
