'use client';

import { useLocale } from 'next-intl';
import { useEffect } from 'react';

export default function HtmlAttributes() {
  const locale = useLocale();

  useEffect(() => {
    const dir = locale === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
    document.body.style.textAlign = locale === 'ar' ? 'right' : 'left';
  }, [locale]);

  return null;
}
