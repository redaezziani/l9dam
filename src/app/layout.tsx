import { NextIntlClientProvider } from 'next-intl';
import './globals.css';
import Header from '../components/ui/header';
import Footer from '../components/ui/footer';
import { getLocale } from '../i18n/request';
import { generateOrganizationSchema, generateWebSiteSchema } from '../lib/seo-utils';

type Props = {
  children: React.ReactNode;
};

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://lqdam.com',
  ),
  title: {
    default: 'Lqdam - Authentic Kung Fu Shoes',
    template: '%s | Lqdam',
  },
  description:
    'Discover authentic kung fu shoes from Lqdam. Lightweight, durable, and comfortable footwear inspired by Shaolin tradition.',
  keywords: [
    'kung fu shoes',
    'martial arts footwear',
    'Lqdam',
    'Shaolin shoes',
    'athletic shoes',
    'comfortable shoes',
  ],
  authors: [{ name: 'Lqdam' }],
  creator: 'Lqdam',
  publisher: 'Lqdam',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['ar_AE'],
    siteName: 'Lqdam',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@lqdam',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function RootLayout({ children }: Props) {
  const locale = await getLocale();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const textAlign = locale === 'ar' ? 'right' : 'left';
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lqdam.com';

  const organizationSchema = generateOrganizationSchema(baseUrl);
  const webSiteSchema = generateWebSiteSchema(baseUrl);

  return (
    <html lang={locale} dir={dir}>
      <body
        className="flex flex-col  bg-[#fdefe5a8]  relative min-h-screen justify-start items-center"
        style={{ textAlign: textAlign as any }}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
        <span className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none bg-[url('https://texturelabs.org/wp-content/uploads/Texturelabs_Paper_126S.jpg')] bg-repeat bg-top bg-size-[1800px_1800px] opacity-15 mix-blend-multiply animate-paperMove"></span>

        <NextIntlClientProvider>
          <Header />
          <main className="flex-1  w-full">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
