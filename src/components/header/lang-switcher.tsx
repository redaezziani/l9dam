'use client';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { startTransition } from 'react';

const LangSwitcher = () => {
  const t = useTranslations('Common.Header.langSwitcher');
  const locale = useLocale();
  const router = useRouter();

  const targetLocale = locale === 'en' ? 'ar' : 'en';

  const handleLanguageChange = () => {
    document.cookie = `NEXT_LOCALE=${targetLocale}; path=/; max-age=31536000`;
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <div
      onClick={handleLanguageChange}
      style={{
        fontSize: '12px',
        color: '#4a403a',
        cursor: 'pointer',
        textDecoration: 'underline',
      }}
      className=" select-none"
    >
      {t(targetLocale)}
    </div>
  );
};

export default LangSwitcher;
