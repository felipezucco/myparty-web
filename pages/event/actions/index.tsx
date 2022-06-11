import { GetServerSideProps } from "next";
import { ReactElement } from "react";
import LayoutComponent from "../../../components/layout/layout";
import { parseCookies } from 'nookies'

const Actions = () => {

  return (
    <div>
      Actions
    </div>
    // <LayoutDashboard />
  );
}

Actions.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutComponent>
      {page}
    </LayoutComponent>
  )
}

export default Actions;

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