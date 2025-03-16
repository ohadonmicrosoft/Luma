import React, { useEffect } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { appWithTranslation, useTranslation } from "next-i18next";
import { LayoutProvider } from "@/contexts/LayoutContext";
import { DirectionProvider } from "@/contexts/DirectionContext";
import i18n from "@/lib/i18n";
import "../styles/globals.css";

// Ensure i18n is initialized
if (i18n.options && !i18n.isInitialized) {
  i18n.init({
    fallbackLng: "en",
    defaultNS: "common",
    supportedLngs: ["en", "he"],
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    react: {
      useSuspense: false,
    },
  });
}

function App({ Component, pageProps }: AppProps) {
  const { i18n } = useTranslation();

  // Ensure HTML lang attribute is synchronized with i18n
  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  // Initialize accessibility testing in development mode
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      import("@/utils/a11y").then(({ initA11yTesting }) => {
        initA11yTesting();
      });
    }
  }, []);

  return (
    <DirectionProvider>
      <LayoutProvider>
        <Head>
          <title>Luma - Tactical & Outdoor Equipment</title>
          <meta
            name="description"
            content="High-quality tactical gear, outdoor equipment, and home accessories."
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </LayoutProvider>
    </DirectionProvider>
  );
}

// Make sure we're passing serverSideTranslations result to pages
export default appWithTranslation(App);
