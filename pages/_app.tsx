import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'primeflex/primeflex.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { AuthProvider } from '../contexts/AuthContext';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {

  const getLayout = Component.getLayout ?? ((page) => page)
  return (
    <AuthProvider>
      {getLayout(<Component {...pageProps} />)}
    </AuthProvider>
  )
}

export default MyApp
