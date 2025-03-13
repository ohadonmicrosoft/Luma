import type { AppProps } from 'next/app';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';
import { LayoutProvider } from '@/contexts/LayoutContext';
import '../styles/globals.css';

function App({ Component, pageProps }: AppProps) {
  return (
    <LayoutProvider>
      <Head>
        <title>Luma - Tactical & Outdoor Equipment</title>
        <meta name="description" content="High-quality tactical gear, outdoor equipment, and home accessories." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </LayoutProvider>
  );
}

export default appWithTranslation(App); 
