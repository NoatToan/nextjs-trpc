import type { Metadata } from 'next';

import { cn } from '@src/utilities/ui';
import React from 'react';

import { AdminBar } from '@src/components/AdminBar';
import { Footer } from '@src/Footer/Component';
import { Header } from '@src/Header/Component';
import { Providers } from '@src/providers';
import { InitTheme } from '@src/providers/Theme/InitTheme';
import { mergeOpenGraph } from '@src/utilities/mergeOpenGraph';
import { draftMode } from 'next/headers';

import './globals.css';
import { getServerSideURL } from '@src/utilities/getURL';

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
