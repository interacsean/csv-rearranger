import { AppPropsType } from 'next/dist/next-server/lib/utils';

import '../theme/global.scss'

export default function MyApp({ Component, pageProps }: AppPropsType) {
  return <Component {...pageProps} />
}
