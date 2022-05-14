import { ReactElement } from "react";
import { useForm } from "react-hook-form";
import LayoutComponent from "../../components/Layout/layout";
import { LocalDTO } from "../../src/dto/local.dto";

const Locals = () => {

  const { register, handleSubmit, getValues, setValue } = useForm<LocalDTO>();

  const handleSubmitForm = () => {
    alert("a")
  }

  return (
    <>
      <h1>Locals</h1>
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
    </>

  )
}
export default Locals;

Locals.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutComponent>
      {page}
    </LayoutComponent>
  )
}