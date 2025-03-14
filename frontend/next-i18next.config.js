/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "he"],
    localeDetection: false,
  },
  defaultNS: "common",
  localePath: "./public/locales",
  reloadOnPrerender: process.env.NODE_ENV === "development",
  react: { useSuspense: false },
};
