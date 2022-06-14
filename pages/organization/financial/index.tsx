import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { FunctionComponent, ReactElement } from "react";
import LayoutComponent from "../../../components/layout/layout";
import { getMenu } from "../../_default";

const FinancialComponent = () => {
  return (
    <div>financeiro</div>
  );
}

FinancialComponent.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutComponent name={getMenu("Financial")}>
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