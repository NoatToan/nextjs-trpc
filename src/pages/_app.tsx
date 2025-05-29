import Providers from '@src/modules/providers';
import { trpc } from '@src/modules/utils/trpc';
import type { AppType } from 'next/app';

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  );
};
export default trpc.withTRPC(MyApp);
