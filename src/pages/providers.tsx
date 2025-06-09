import React from 'react';

import { HeroUIProvider, ToastProvider } from '@heroui/react';

const Providers: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <HeroUIProvider>
      <ToastProvider />
      {children}
    </HeroUIProvider>
  );
};
export default Providers;
