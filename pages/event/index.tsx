import { GetServerSideProps } from "next";
import { ReactElement, useEffect } from "react";
import LayoutComponent from "../../components/layout/layout";
import { destroyCookie, parseCookies } from 'nookies';

const Events = () => {

  return (
    <div>
      new event
    </div>
  );
}

Events.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutComponent>
      {page}
    </LayoutComponent>
  )
}

export default Events;

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