import { GetServerSideProps } from "next";
import { ReactElement } from "react";
import LayoutComponent from "../../../components/Layout/layout";
import { parseCookies } from 'nookies'

const Financial = () => {

  return (
    <div>
      Financial
    </div>
    // <LayoutDashboard />
  );
}

Financial.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutComponent>
      {page}
    </LayoutComponent>
  )
}

export default Financial;

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