import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head';
import { parseCookies } from 'nookies';
import { getAPIClient } from '../services/axios';
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


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const axios = getAPIClient(ctx);
  const { 'eventweb.token': token } = parseCookies(ctx);
  console.log('eventweb.token do index', token)
  if (!!token) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false
      }
    }
  } else return {
    redirect: {
      destination: '/login',
      permanent: true
    }
  }
}
