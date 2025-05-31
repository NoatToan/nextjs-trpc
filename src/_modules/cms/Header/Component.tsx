import { HeaderClient } from './Component.client';
import { getCachedGlobal } from '@moduleCMS/utilities/getGlobals';
import React from 'react';

import type { Header } from '@src/payload-types';

export async function Header() {
  const headerData: Header = await getCachedGlobal('header', 1)();

  return <HeaderClient data={headerData} />;
}
