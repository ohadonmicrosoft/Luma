import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

// Only initialize i18next on the client side
if (typeof window !== "undefined") {
  // Initialize i18next
  i18n
    .use(Backend) // Load translations via http
    .use(LanguageDetector) // Detect user language
    .use(initReactI18next) // Pass i18n instance to react-i18next
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
    });
}

export default i18n;
