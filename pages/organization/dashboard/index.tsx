import { GetServerSideProps } from "next";
import { FC, ReactElement, useEffect } from "react";
import LayoutComponent from "../../../components/layout/layout";
import { destroyCookie, parseCookies } from 'nookies'
import { NextPageWithLayout } from "../../_app";
import { getMenu } from "../../_default";

const Dashboard: NextPageWithLayout = () => {

  return (
    <div>
      dashboard da organização
    </div>
  );
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutComponent name={getMenu("Dashboard")}>
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