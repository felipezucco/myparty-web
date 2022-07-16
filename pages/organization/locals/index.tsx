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
import { asyncSetLocals } from "../../../src/store/organization_ctx.store";

const LocalPage = () => {

  // Context
  const organization_ctx = useAppSelector((state) => state.organization_ctx);
  const dispatch = useAppDispatch();

  /* Methods */

  useEffect(() => {
    dispatch(asyncSetLocals(organization_ctx.selected_organization.id));
  }, [organization_ctx.selected_organization.id])

  const LocalsList = () => {
    return (
      <ul className={styled["locals-list-component"]}>
        {organization_ctx.locals.map(local => {
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