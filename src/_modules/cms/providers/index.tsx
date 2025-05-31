import React from 'react';

import { HeroUIProvider, ToastProvider } from '@heroui/react';
import { HeaderThemeProvider } from './HeaderTheme';
import { ThemeProvider } from './Theme';

const Providers: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <HeroUIProvider>
        <ToastProvider />
        <HeaderThemeProvider>{children}</HeaderThemeProvider>
      </HeroUIProvider>
    </ThemeProvider>
  );
};
export default Providers;
