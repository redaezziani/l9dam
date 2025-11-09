import { NextIntlClientProvider } from 'next-intl';
import './globals.css';
import Header from '../components/layout/header';
import Footer from '../components/layout/footer';
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
        className="flex flex-col   relative min-h-screen justify-start items-center"
        style={{ textAlign: textAlign as any }}
      >
        <svg width="0" height="0">
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency=".4"
              numOctaves="3"
              result="noise"
            />
            <feBlend in="SourceGraphic" in2="noise" mode="multiply" />
          </filter>
        </svg>
        <span className="  z-999 bg-[#ff715115] w-full h-screen fixed " />
        <NextIntlClientProvider>
          <Header />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
