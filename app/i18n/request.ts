import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

const supportedLocales = ['en', 'ru'];
const defaultLocale = 'en';

// @ts-expect-error: searchParams may be undefined in some cases, handled with defaultLocale
export default getRequestConfig(async ({ searchParams }) => {
  let locale = searchParams?.get('lang') || defaultLocale;

  if (!supportedLocales.includes(locale)) {
    locale = defaultLocale;
  }

  try {
    return {
      locale,
      messages: (await import(`../i18n/translations/${locale}.json`)).default,
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    notFound();
  }
});
