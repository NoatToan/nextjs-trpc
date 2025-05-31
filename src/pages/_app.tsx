import Providers from '@module/providers';
import { trpc } from '@module/utils/trpc';
import type { AppType } from 'next/app';

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  );
};
export default trpc.withTRPC(MyApp);
