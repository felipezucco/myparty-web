import { GetServerSideProps } from "next";
import { ReactElement, useEffect } from "react";
import LayoutComponent from "../../../components/layout/layout";
import { destroyCookie, parseCookies } from 'nookies'
import { getAPIClient } from "../../../services/axios";

const Dashboard = () => {

  return (
    <div>dashboard da organização</div>
  );
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutComponent>
      {page}
    </LayoutComponent>
  )
}

export default Dashboard;

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