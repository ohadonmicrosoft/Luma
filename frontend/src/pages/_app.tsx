import React, { useEffect } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { appWithTranslation, useTranslation } from "next-i18next";
import { LayoutProvider } from "@/contexts/LayoutContext";
import "@/lib/i18n";
import "../styles/globals.css";

function App({ Component, pageProps }: AppProps) {
  const { i18n } = useTranslation();

  // Ensure HTML lang attribute is synchronized with i18n
  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
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
  );
}

// Make sure we're passing serverSideTranslations result to pages
export default appWithTranslation(App);
