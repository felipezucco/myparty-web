import { GetServerSideProps } from "next";
import { ReactElement, useEffect } from "react";
import LayoutComponent from "../../components/Layout/layout";
import { destroyCookie, parseCookies } from 'nookies'
import { getAPIClient } from "../../services/axios";
import LayoutDashboard from "../../components/Layout/dashboard/layout_dashboard";

const Dashboard = () => {

  return (
    <LayoutDashboard />
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