import type { Metadata } from 'next';

import { cn } from '@moduleCMS/utilities/ui';
import React from 'react';

import { AdminBar } from '@moduleCMS/components/AdminBar';
import { InitTheme } from '@moduleCMS/providers/Theme/InitTheme';
import { mergeOpenGraph } from '@moduleCMS/utilities/mergeOpenGraph';
import { draftMode } from 'next/headers';

import { Footer } from '@moduleCMS/Footer/Component';
import { Header } from '@moduleCMS/Header/Component';
import { getServerSideURL } from '@moduleCMS/utilities/getURL';
import './../../globals.scss';
import Providers from '@moduleCMS/providers';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode();

  return (
    <html className={cn()} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
};
