import type { NextPage } from 'next'
import Head from 'next/head';
import LoginPage from './login';

const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>Event Web | Home</title>
      </Head>
      <LoginPage />
    </>
  );
}

export default Home;
