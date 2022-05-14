import { ReactElement } from "react";
import LayoutComponent from "../../components/Layout/layout";
import { GetServerSideProps, GetServerSidePropsContext, PreviewData } from 'next'
import { getAPIClient } from "../../services/axios";
import { ParsedUrlQuery } from "querystring";
import { parseCookies } from "nookies";
import { AxiosResponse } from "axios";

const TicketComponent = () => {
  return (
    <div>ingressos</div>
  );
}

TicketComponent.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutComponent>
      {page}
    </LayoutComponent>
  )
}

export default TicketComponent;

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