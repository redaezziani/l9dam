'use client';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { startTransition } from 'react';

const LangSwitcher = () => {
  const t = useTranslations('Common.Header.langSwitcher');
  const locale = useLocale();
  const router = useRouter();

  const handleLanguageChange = (newLocale: string) => {
    if (newLocale === locale) return;
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px',
        color: '#4a403a',
        cursor: 'pointer',
      }}
    >
      <p
        onClick={() => handleLanguageChange('en')}
        style={{
          textDecoration: locale === 'en' ? 'underline' : 'none',
        }}
      >
        {t('en')}
      </p>
      <p
        onClick={() => handleLanguageChange('ar')}
        style={{
          textDecoration: locale === 'ar' ? 'underline' : 'none',
        }}
      >
        {t('ar')}
      </p>
    </div>
  );
};

export default LangSwitcher;
