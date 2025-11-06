import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

export default getRequestConfig(async () => {
  // Get locale from cookie, default to 'ar'
  const cookieStore = cookies();
  const locale = (await cookieStore).get('NEXT_LOCALE')?.value || 'ar';

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});

// Helper function to get current locale
export async function getLocale() {
  const cookieStore = cookies();
  return (await cookieStore).get('NEXT_LOCALE')?.value || 'ar';
}
