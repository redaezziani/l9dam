'use client';
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('HomePage');
  return <span className=" font-helvetica flex gap-2"></span>;
}
