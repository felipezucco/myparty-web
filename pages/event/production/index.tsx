import { GetServerSideProps } from "next";
import { ReactElement, useEffect } from "react";
import LayoutComponent from "../../../components/layout/layout";
import { parseCookies } from 'nookies'
import getMenu, { MenuEnum } from "../../../components/default";
import { useAppDispatch, useAppSelector } from "../../../src/store/hooks";
import { asyncSetProductions } from "../../../src/store/event.store";
import ProductionView from "../../../components/production/production_view/production_view";

const ProductionPage = () => {

  // Context
  const controller = useAppSelector(state => state.controller);
  const event = useAppSelector(state => state.event);
  const dispatch = useAppDispatch();

  /* Methods */

  useEffect(() => {
    loadProduction();
  }, [controller.selected_event.id!])

  const loadProduction = () => {
    dispatch(asyncSetProductions(controller.selected_event.id));
  }

  return (
    <ProductionView productions={event.productions} />
  );
}

ProductionPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutComponent name={getMenu("Production", MenuEnum.EVENT_MENU)}>
      {page}
    </LayoutComponent>
  )
}

export default ProductionPage;

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