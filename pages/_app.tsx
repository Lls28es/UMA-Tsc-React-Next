import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Basic_FontSize-Medias.scss';
import '../styles/specificStyles.scss';
import '../styles/generalStyles.scss';
import '../styles/mediaQueries.scss';

import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
