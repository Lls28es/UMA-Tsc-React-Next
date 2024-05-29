import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Basic_FontSize-Medias.scss';
import '../styles/style.css';
import '../styles/DVStyles.scss';
import '../styles/estilosGenerales.scss';
// import '../styles/react-datepicker.min.css';

import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
