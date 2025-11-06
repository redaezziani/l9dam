import { NextIntlClientProvider } from 'next-intl';
import './globals.css';
import Header from '../components/header/header';
import { getLocale } from '../i18n/request';

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  const locale = await getLocale();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const textAlign = locale === 'ar' ? 'right' : 'left';

  return (
    <html lang={locale} dir={dir}>
      <body
        className="flex flex-col relative min-h-screen justify-start items-center gap-4"
        style={{ textAlign: textAlign as any }}
      >
        <NextIntlClientProvider>
          <Header />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
