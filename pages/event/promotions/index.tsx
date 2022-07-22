import { GetServerSideProps } from "next";
import { ReactElement, useEffect } from "react";
import LayoutComponent from "../../../components/layout/layout";
import { parseCookies } from 'nookies'
import getMenu, { EVENT_MENU, MenuEnum } from "../../../components/default";
import { useForm } from "react-hook-form";
import { PersistPromotion } from "../../../src/dto/promotion.dto";
import { persistPromotion } from "../../../services/api.promotion";
import { useAppDispatch, useAppSelector } from "../../../src/store/hooks";
import { useDispatch } from "react-redux";
import { asyncSetPromotions } from "../../../src/store/event.store";
import PromotionView from "../../../components/promotion/promotion_view/promotion_view";

const PromotionPage = () => {

  // Context
  const controller = useAppSelector(state => state.controller);
  const event = useAppSelector(state => state.event);
  const dispatch = useAppDispatch();

  /* Methods */

  useEffect(() => {
    loadPromotions();
  }, [controller.selected_event.id]);

  const loadPromotions = () => {
    dispatch(asyncSetPromotions(controller.selected_event.id));
  }

  return (
    <PromotionView promotions={event.promotions} />
  );
}

PromotionPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutComponent name={getMenu("Promotions", MenuEnum.EVENT_MENU)}>
      {page}
    </LayoutComponent>
  )
}

export default PromotionPage;

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