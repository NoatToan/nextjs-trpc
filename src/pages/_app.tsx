import { trpc } from '@module/utils/trpc';
import Providers from '@moduleCMS/providers';
import type { AppType } from 'next/app';
import './../globals.scss';

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  );
};
export default trpc.withTRPC(MyApp);
