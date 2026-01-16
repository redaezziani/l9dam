import Link from 'next/link';
import { getLocale } from '../i18n/request';
import BaseLayout from '../components/layout/base-layout';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const messages = (await import(`../../messages/${locale}.json`)).default;
  const t = messages.NotFoundPage;

  return {
    title: t.metaTitle,
    description: t.metaDescription,
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      title: t.metaTitle,
      description: t.metaDescription,
      type: 'website',
      locale: locale === 'ar' ? 'ar_AE' : 'en_US',
    },
  };
}

export default async function NotFound() {
  const locale = await getLocale();
  const messages = (await import(`../../messages/${locale}.json`)).default;
  const t = messages.NotFoundPage;

  return (
    <BaseLayout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-16">
        <div className="text-center max-w-2xl mx-auto">
          {/* 404 Number */}
          <h1
            className="text-6xl font-bold mb-4"
            style={{ color: '#4a403a' }}
          >
            404
          </h1>

          {/* Title */}
          <h2
            className="text-xl md:text-2xl font-semibold mb-4"
            style={{ color: '#4a403a' }}
          >
            {t.title}
          </h2>

          {/* Description */}
          <p
            className="text-sm md:text-base mb-8 opacity-80"
            style={{ color: '#4a403a' }}
          >
            {t.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/"
              className="font-medium transition-opacity duration-200 hover:opacity-60"
              style={{
                color: '#4a403a'
              }}
            >
              {t.goHome}
            </Link>

            <Link
              href="/store"
              className="font-medium transition-opacity duration-200 hover:opacity-60"
              style={{
                color: '#4a403a'
              }}
            >
              {t.goToStore}
            </Link>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
