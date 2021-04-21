import { AppPropsType } from 'next/dist/next-server/lib/utils';
import { RecoilRoot } from 'recoil';

import '../theme/global.scss'

export default function MyApp({ Component, pageProps }: AppPropsType) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}
