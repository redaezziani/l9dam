import { useTranslations } from 'next-intl';
import PixelButton from './try';

export default function HomePage() {
  const t = useTranslations('HomePage');
  return (
    <div className="p-4">
      <PixelButton>{t('title')}</PixelButton>
    </div>
  );
}
