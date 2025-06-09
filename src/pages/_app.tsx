import { trpc } from '@module/utils/trpc';
import Providers from '@src/pages/providers';
import type { AppType } from 'next/app';
import './../globals.css';

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  );
};
export default trpc.withTRPC(MyApp);
