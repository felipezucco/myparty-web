import type { NextPage } from 'next'
import Head from 'next/head';
import SignInPage from './auth/signin';

const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>Event Web | Home</title>
      </Head>
      <SignInPage />
    </>
  );
}

export default Home;