import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticPropsContext, GetServerSidePropsContext } from "next";

/**
 * Default namespaces that should be loaded for all pages
 */
export const defaultNamespaces = ["common"];

/**
 * Helper to include translations in getStaticProps
 *
 * @param locale - The locale to load translations for
 * @param namespaces - Additional namespaces to load besides 'common'
 * @returns Object to be spread into the getStaticProps return value
 */
export const getI18nProps = async (
  locale: string,
  namespaces: string[] = []
) => {
  const allNamespaces = [...defaultNamespaces, ...namespaces];
  return {
    ...(await serverSideTranslations(locale, allNamespaces)),
  };
};

/**
 * Helper to include translations in getStaticProps based on context
 *
 * @param ctx - GetStaticPropsContext from next.js
 * @param namespaces - Additional namespaces to load besides 'common'
 * @returns Object to be spread into the getStaticProps return value
 */
export const getI18nStaticProps = async (
  ctx: GetStaticPropsContext,
  namespaces: string[] = []
) => {
  const locale = ctx.locale || ctx.defaultLocale || "en";
  return await getI18nProps(locale, namespaces);
};

/**
 * Helper to include translations in getServerSideProps based on context
 *
 * @param ctx - GetServerSidePropsContext from next.js
 * @param namespaces - Additional namespaces to load besides 'common'
 * @returns Object to be spread into the getServerSideProps return value
 */
export const getI18nServerSideProps = async (
  ctx: GetServerSidePropsContext,
  namespaces: string[] = []
) => {
  const locale = ctx.locale || ctx.defaultLocale || "en";
  return await getI18nProps(locale, namespaces);
};

/**
 * Get direction based on locale
 *
 * @param locale - The locale to check
 * @returns 'rtl' for RTL languages, 'ltr' otherwise
 */
export const getLocaleDirection = (locale: string): "ltr" | "rtl" => {
  const rtlLocales = ["he", "ar", "fa", "ur"];
  return rtlLocales.some((rtlLocale) => locale.startsWith(rtlLocale))
    ? "rtl"
    : "ltr";
};

/**
 * Check if locale is RTL
 *
 * @param locale - The locale to check
 * @returns true for RTL languages, false otherwise
 */
export const isRtlLocale = (locale: string): boolean => {
  return getLocaleDirection(locale) === "rtl";
};
