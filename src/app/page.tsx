import HeroSection from '../components/ui/hero-section';
import BaseLayout from '../components/layout/base-layout';
import { getLocale } from '../i18n/request';
import FlipAnimationLink from '../components/ui/flip-animation-link';
import { Metadata } from 'next';
import { getHomepageData } from '../(actions)/home';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const homepageData = await getHomepageData(locale);

  return {
    title: homepageData?.title || 'My Awesome Page',
    description:
      homepageData?.metaDescription ||
      'A concise and engaging description of my awesome page content.',
  };
}

export default async function HomePage() {
  const locale = await getLocale();
  const homepageData = await getHomepageData(locale);

  return (
    <BaseLayout>
      <FlipAnimationLink locale={locale} />
      <HeroSection content={homepageData?.content || ''} />
    </BaseLayout>
  );
}
