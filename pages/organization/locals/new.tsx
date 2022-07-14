import { AxiosError } from "axios";
import { ReactElement, useEffect } from "react";
import { useForm } from "react-hook-form";
import getMenu from "../../../components/default";
import LayoutComponent from "../../../components/layout/layout";
import { persistLocal } from "../../../services/api.local";
import { PersistLocal } from "../../../src/dto/local.dto";
import { useAppDispatch, useAppSelector } from "../../../src/store/hooks";
import { asyncSetLocals } from "../../../src/store/organization_ctx.store";

const NewLocalPage = () => {

  // Context
  const organization_ctx = useAppSelector((state) => state.organization_ctx);
  const dispatch = useAppDispatch();
  // Hook-Form
  const { register, handleSubmit, getValues } = useForm<PersistLocal>();

  /* Methods */

  useEffect(() => {
    dispatch(asyncSetLocals(organization_ctx.selected_organization.id!));
  }, [])

  const handleSubmitForm = async () => {
    return await persistLocal(getValues()).then(res => {
      alert("Local created successfuly");
    }).catch((err: AxiosError) => {
      console.error("Error to create local:", err.message);
      alert("Error to create local. See log to more.")
    })
  }

  return (
    <>
      <form method="post" onSubmit={handleSubmit(handleSubmitForm)}>
        <label htmlFor="aisle">Aisle</label>
        <input type={"text"} {...register("aisle")} required /><br />
        <label htmlFor="block">Block</label>
        <input type={"text"} {...register("block")} required /><br />
        <label htmlFor="city">City</label>
        <input type={"text"} {...register("city")} required /><br />
        <label htmlFor="code">Code</label>
        <input type={"text"} {...register("code")} required /><br />
        <label htmlFor="complement">Complement</label>
        <input type={"text"} {...register("complement")} /><br />
        <label htmlFor="number">Number</label>
        <input type={"number"} {...register("number")} /><br />
        <label htmlFor="number">State</label>
        <input type={"text"} {...register("state")} maxLength={2} required /><br />
        <input type={"hidden"} {...register("organizationId")} value={organization_ctx.selected_organization.id!} />
        <button type={"submit"}>Create</button>
      </form>
    </>

  )
}
export default NewLocalPage;

NewLocalPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutComponent name={getMenu("Locals")}>
      {page}
    </LayoutComponent>
  )
}