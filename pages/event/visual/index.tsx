import { GetServerSideProps } from "next";
import { ReactElement, useEffect } from "react";
import LayoutComponent from "../../../components/layout/layout";
import { parseCookies } from 'nookies'
import getMenu, { MenuEnum } from "../../../components/default";
import { useForm } from "react-hook-form";
import { persistPromotion } from "../../../services/api.promotion";
import { PersistPromotion } from "../../../src/dto/promotion.dto";
import { useAppSelector, useAppDispatch } from "../../../src/store/hooks";
import { PersistVisual } from "../../../src/dto/visual.dto";
import { persistVisual } from "../../../services/api.visual";
import { asyncSetVisuals } from "../../../src/store/event.store";
import VisualView from "../../../components/visual/visual_view/visual_view";

const VisualPage = () => {

  // Context
  const controller = useAppSelector(state => state.controller);
  const event = useAppSelector(state => state.event);
  const dispatch = useAppDispatch();

  /* Methods */

  useEffect(() => {
    loadVisuals();
  }, [controller.selected_event.id]);

  const loadVisuals = () => {
    dispatch(asyncSetVisuals(controller.selected_event.id));
  }

  return (
    <VisualView visuals={event.visuals} />
  );
}

VisualPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutComponent name={getMenu("Visual", MenuEnum.EVENT_MENU)}>
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
      destination: '/',
      permanent: false
    }
  }
}