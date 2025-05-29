'use client';

import { HeroUIProvider } from '@heroui/react';
import { ToastProvider } from '@heroui/toast';
// import { NuqsAdapter } from 'nuqs/adapters/react';
import { createContext, Fragment } from 'react';

export const AuthContext = createContext<{ user: unknown }>({ user: null });

export const ProviderGlobal = createContext({ isMobile: false });

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Fragment>
      {/* <NuqsAdapter> */}
      <HeroUIProvider>
        <ToastProvider />
        {children}
      </HeroUIProvider>
      {/* </NuqsAdapter> */}
    </Fragment>
  );
}
