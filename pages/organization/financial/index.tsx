import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { FunctionComponent, ReactElement } from "react";
import LayoutComponent from "../../../components/Layout/layout";

const FinancialComponent = () => {
  return (
    <div>financeiro</div>
  );
}

FinancialComponent.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutComponent>
      {page}
    </LayoutComponent>
  )
}

export default FinancialComponent;

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