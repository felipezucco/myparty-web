import { GetServerSideProps } from "next";
import { ReactElement, useEffect } from "react";
import LayoutComponent from "../../../components/layout/layout";
import { parseCookies } from 'nookies'
import getMenu, { MenuEnum } from "../../../components/default";
import { useAppDispatch, useAppSelector } from "../../../src/store/hooks";
import ActionView from "../../../components/action/action_view/action_view";
import { asyncSetActions } from "../../../src/store/event.store";

const ActionPage = () => {

  // Context
  const controller = useAppSelector(state => state.controller);
  const event = useAppSelector(state => state.event);
  const dispatch = useAppDispatch();

  /* Methods */

  useEffect(() => {
    loadResources();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controller.selected_event.id])

  const loadResources = () => {
    dispatch(asyncSetActions(controller.selected_event.id));
  }

  return (
    <ActionView actions={event.actions} />
  );
}

ActionPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutComponent name={getMenu("Actions", MenuEnum.EVENT_MENU)}>
      {page}
    </LayoutComponent>
  )
}

export default ActionPage;

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