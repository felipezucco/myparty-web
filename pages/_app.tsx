import '../styles/globals.css'
import type { AppProps } from 'next/app'
import LayoutComponent from '../comps/Layout'
import 'primeflex/primeflex.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LayoutComponent>
      <Component {...pageProps} />
    </LayoutComponent>
  )
}

export default MyApp
