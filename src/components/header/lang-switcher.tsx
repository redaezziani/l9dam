'use client';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { startTransition } from 'react';

const LangSwitcher = () => {
  const t = useTranslations('Common.Header.langSwitcher');
  const locale = useLocale();
  const router = useRouter();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;

    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <select
      value={locale}
      onChange={handleLanguageChange}
      style={{
        backgroundColor: '#f0f0f0',
        border: '2px solid #808080',
        borderRadius: '0',
        padding: '4px',
        fontFamily: 'Tahoma, Verdana, sans-serif',
        fontSize: '12px',
        color: '#000',
        boxShadow: 'inset 1px 1px #fff, inset -1px -1px #404040',
        cursor: 'pointer',
      }}
    >
      <option value="ar">{t('ar')}</option>
      <option value="en">{t('en')}</option>
    </select>
  );
};

export default LangSwitcher;
