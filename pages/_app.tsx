import "../styles/app.css";
import '../styles/globals.scss';
import type { AppProps } from 'next/app'
import 'primeflex/primeflex.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { AuthProvider } from '../contexts/AuthContext';
import { GetServerSideProps, NextPage } from 'next';
import { ReactElement, ReactNode, useEffect } from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { store } from '../src/store/store';
import { Provider } from 'react-redux';


export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {

  const getLayout = Component.getLayout ?? ((page) => page)
  return (
    <Provider store={store}>
      <AuthProvider>
        {getLayout(<Component {...pageProps} />)}
      </AuthProvider>
    </Provider>
  )
}

export default MyApp
