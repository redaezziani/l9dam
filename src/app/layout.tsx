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
        className="flex flex-col  bg-[#fdefe5a8]  relative min-h-screen justify-start items-center"
        style={{ textAlign: textAlign as any }}
      >
        <span className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none bg-[url('https://texturelabs.org/wp-content/uploads/Texturelabs_Paper_126S.jpg')] bg-repeat bg-top bg-size-[900px_900px] opacity-15 mix-blend-multiply animate-paperMove"></span>

        {/* <span className="  z-999 bg-[#ff715115] w-full h-screen fixed " /> */}
        <NextIntlClientProvider>
          <Header />
          <main className="flex-1  w-full">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
