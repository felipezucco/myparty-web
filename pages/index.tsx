import type { NextPage } from 'next'
import Head from 'next/head';
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