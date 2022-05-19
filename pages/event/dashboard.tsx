import { GetServerSideProps } from "next";
import { ReactElement } from "react";
import LayoutComponent from "../../components/Layout/layout";
import { parseCookies } from 'nookies'

const Dashboard = () => {

  return (
    <div>
      EventId
    </div>
    // <LayoutDashboard />
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