import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import Header from '../../components/ui/header';
import Footer from '../../components/ui/footer';
import HtmlAttributes from '../../components/html-attributes';
import { routing } from '../../i18n/routing';
import { generateOrganizationSchema, generateWebSiteSchema } from '../../lib/seo-utils';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = (await import(`../../../messages/${locale}.json`)).default;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lqdam.com';
  const organizationSchema = generateOrganizationSchema(baseUrl);
  const webSiteSchema = generateWebSiteSchema(baseUrl);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <HtmlAttributes />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
      <span className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none bg-[url('https://texturelabs.org/wp-content/uploads/Texturelabs_Paper_126S.jpg')] bg-repeat bg-top bg-size-[1800px_1800px] opacity-15 mix-blend-multiply animate-paperMove"></span>

      <Header />
      <main className="flex-1  w-full">{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}
