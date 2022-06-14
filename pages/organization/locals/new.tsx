import { AxiosError } from "axios";
import { ReactElement, useEffect } from "react";
import { useForm, UseFormGetValues } from "react-hook-form";
import LayoutComponent from "../../../components/layout/layout";
import { persistLocal } from "../../../services/api.local";
import { LocalDTO } from "../../../src/dto/local.dto";
import { useAppDispatch, useAppSelector } from "../../../src/store/hooks";
import { asyncSetLocals } from "../../../src/store/organization_ctx.store";
import { getMenu, ORGANIZATION_MENU } from "../../_default";

const NewLocals = () => {

  //context
  const organization_ctx = useAppSelector((state) => state.organization_ctx);
  const dispatch = useAppDispatch();

  //state
  const { register, handleSubmit, getValues, setValue } = useForm<LocalDTO>();

  useEffect(() => {
    dispatch(asyncSetLocals(organization_ctx.selected_organization.id!));
  }, [])

  const handleSubmitForm = () => {
    // set organization
    setValue("organization", organization_ctx.selected_organization);

    createLocal(getValues());
  }

  const createLocal = async (data: LocalDTO) => {
    return await persistLocal(data).then(res => {
      alert("Local created successfuly");
    }).catch((err: AxiosError) => {
      console.error("Error to create local:", err.message);
      alert("Error to create local. See log to more.")
    })
  }

  const LocalsList = () => {
    return (
      <ul>
        {organization_ctx.locals.map(local => {
          return <li key={local.id}>{local.aisle} - {local.city} <a href="/">Editar</a> <a href="/">Deletar</a></li>
        })}
      </ul>
    )
  }

  return (
    <>
      <form method="post" onSubmit={handleSubmit(handleSubmitForm)}>
        <label htmlFor="aisle">Aisle</label>
        <input type={"text"} {...register("aisle")} /><br />
        <label htmlFor="block">Block</label>
        <input type={"text"} {...register("block")} /><br />
        <label htmlFor="city">City</label>
        <input type={"text"} {...register("city")} /><br />
        <label htmlFor="code">Code</label>
        <input type={"text"} {...register("code")} /><br />
        <label htmlFor="complement">Complement</label>
        <input type={"text"} {...register("complement")} /><br />
        <label htmlFor="number">Number</label>
        <input type={"number"} {...register("number")} /><br />
        <label htmlFor="number">State</label>
        <input type={"text"} {...register("state")} maxLength={2} /><br />
        <button type={"submit"}>Create</button>
      </form>
      {/* <LocalsList /> */}
    </>

  )
}
export default NewLocals;

NewLocals.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutComponent name={getMenu("Locals")}>
      {page}
    </LayoutComponent>
  )
}