import { GetServerSideProps } from "next";
import { ReactElement, useEffect } from "react";
import { destroyCookie, parseCookies } from 'nookies'
import { getAPIClient } from "../../services/axios";
import LayoutComponent from "../../components/Layout/Layout";

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { 'eventweb.token': token } = parseCookies(context);

  if (token) return { props: {} }
  else return {
    redirect: {
      destination: '/auth/invalid_auth',
      permanent: false
    }
  }
}