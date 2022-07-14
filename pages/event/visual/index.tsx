import { GetServerSideProps } from "next";
import { ReactElement } from "react";
import LayoutComponent from "../../../components/layout/layout";
import { parseCookies } from 'nookies'
import getMenu from "../../../components/default";

const VisualPage = () => {

  return (
    <div>
      Visual
    </div>
    // <LayoutDashboard />
  );
}

VisualPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutComponent name={getMenu("Events")}>
      {page}
    </LayoutComponent>
  )
}

export default VisualPage;

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