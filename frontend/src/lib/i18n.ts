import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

// This code prevents i18next initialization errors during server-side rendering
const isBrowser = typeof window !== "undefined";

// Only run initialization in client-side environment
if (isBrowser) {
  // Check for existing instance
  if (!i18n.isInitialized) {
    i18n
      .use(Backend)
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        fallbackLng: "en",
        defaultNS: "common",
        supportedLngs: ["en", "he"],
        interpolation: {
          escapeValue: false, // React already escapes values
        },
        detection: {
          order: ["path", "cookie", "navigator"],
          caches: ["cookie"],
        },
        react: {
          useSuspense: false,
        },
      })
      .catch((error) => {
        console.error("i18n initialization error:", error);
      });
  }
} else {
  // Server-side initialization with minimal config
  if (!i18n.isInitialized) {
    i18n.use(initReactI18next).init({
      lng: "en",
      fallbackLng: "en",
      supportedLngs: ["en", "he"],
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
    });
  }
}

export default i18n;
