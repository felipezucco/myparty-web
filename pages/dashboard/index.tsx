import { GetServerSideProps } from "next";
import { ReactElement, useEffect } from "react";
import LayoutComponent from "../../comps/Layout/Layout";
import { parseCookies } from 'nookies'
import { getAPIClient } from "../../services/axios";

const About = () => {

  useEffect(() => {
    //api.get('/user');
  }, [])

  return (
    <div>Eu sou o dashboard</div>
  );
}

About.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutComponent>
      {page}
    </LayoutComponent>
  )
}

export default About;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const axios = getAPIClient(ctx);
  const { 'eventweb.token': token } = parseCookies(ctx);
  console.log('eventweb.token', token)
  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  //axios.get('/local')

  return {
    props: {}
  }
}