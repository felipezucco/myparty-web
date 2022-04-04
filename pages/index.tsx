import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head';
import Script from 'next/script';
import { parseCookies } from 'nookies';
import { getAPIClient } from '../services/axios';
import SignIn from './auth/signin';

const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>Event Web | Home</title>
      </Head>
      <SignIn />
    </>
  );
}

export default Home;