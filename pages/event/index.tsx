import { GetServerSideProps } from "next";
import { ReactElement, useEffect } from "react";
import LayoutComponent from "../../components/layout/layout";
import { destroyCookie, parseCookies } from 'nookies';
import getMenu from "../../components/default";

const Events = () => {

  return (
    <div>
      new event
    </div>
  );
}

Events.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutComponent name={getMenu("Events")}>
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