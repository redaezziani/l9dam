'use client';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/src/i18n/navigation';
import { startTransition } from 'react';

const LangSwitcher = () => {
  const t = useTranslations('Common.Header.langSwitcher');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const targetLocale = locale === 'en' ? 'ar' : 'en';

  const handleLanguageChange = () => {
    startTransition(() => {
      router.replace(pathname, { locale: targetLocale });
    });
  };

  return (
    <div
      onClick={handleLanguageChange}
      style={{
        fontSize: '12px',
        color: '#4a403a',
        cursor: 'pointer',
      }}
      className=" select-none"
    >
      {t(targetLocale)}
    </div>
  );
};

export default LangSwitcher;
