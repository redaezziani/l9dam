'use client';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Select } from '../retroui/Select';
import { startTransition } from 'react';

const LangSwitcher = () => {
  const t = useTranslations('Common.Header.langSwitcher');
  const locale = useLocale();
  const router = useRouter();

  const handleLanguageChange = (newLocale: string) => {
    // Set cookie with new locale
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;

    // Refresh the page to apply new locale
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <Select value={locale} onValueChange={handleLanguageChange}>
      <Select.Trigger className="min-w-0! w-20">
        <Select.Value placeholder={t('label')} />
      </Select.Trigger>
      <Select.Content>
        <Select.Group>
          <Select.Item value="ar">{t('ar')}</Select.Item>
          <Select.Item value="en">{t('en')}</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select>
  );
};

export default LangSwitcher;
