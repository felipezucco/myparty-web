import { AxiosError } from "axios";
import { ReactElement, useEffect } from "react";
import { useForm, UseFormGetValues } from "react-hook-form";
import getMenu from "../../../components/default";
import LayoutComponent from "../../../components/layout/layout";
import LocalView from "../../../components/locals/local_view/local_view";
import { persistLocal } from "../../../services/api.local";
import { LocalDTO } from "../../../src/dto/local.dto";
import { useAppDispatch, useAppSelector } from "../../../src/store/hooks";
import styled from "./locals_page.module.scss";
import { asyncSetLocals } from "../../../src/store/organization_ctx.store";

const Locals = () => {

  //context
  const organization_ctx = useAppSelector((state) => state.organization_ctx);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(asyncSetLocals(organization_ctx.selected_organization.id!));
  }, [organization_ctx.selected_organization.id])

  const LocalsList = () => {
    return (
      <ul className={styled["locals-list-component"]}>
        {organization_ctx.locals.map(local => {
          return <LocalView local={local} />
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
export default Locals;

Locals.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutComponent name={getMenu("Locals")}>
      {page}
    </LayoutComponent>
  )
}