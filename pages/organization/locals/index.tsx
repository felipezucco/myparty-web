import { AxiosError } from "axios";
import { ReactElement, useEffect } from "react";
import { useForm, UseFormGetValues } from "react-hook-form";
import getMenu from "../../../components/default";
import LayoutComponent from "../../../components/layout/layout";
import LocalView from "../../../components/locals/local_view/local_view";
import { persistLocal } from "../../../services/api.local";
import { GetLocal } from "../../../src/dto/local.dto";
import { useAppDispatch, useAppSelector } from "../../../src/store/hooks";
import styled from "./locals_page.module.scss";
import { asyncSetLocals } from "../../../src/store/organization.store";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

const LocalPage = () => {

  // Context
  const controller = useAppSelector((state) => state.controller);
  const organization = useAppSelector((state) => state.organization);
  const dispatch = useAppDispatch();

  /* Methods */

  useEffect(() => {
    dispatch(asyncSetLocals(controller.selected_organization.id));
  }, [controller.selected_organization.id])

  const LocalsList = () => {
    return (
      <ul className={styled["locals-list-component"]}>
        {organization.locals.map(local => {
          return <LocalView local={local} key={local.id} />
        })}
      </ul>
    )
  }

  return (
    <>
      <LocalsList />
    </>

  )
}
export default LocalPage;

LocalPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutComponent name={getMenu("Locals")}>
      {page}
    </LayoutComponent>
  )
}

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