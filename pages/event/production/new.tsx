import { GetServerSideProps } from "next";
import { ReactElement, useEffect, useState } from "react";
import LayoutComponent from "../../../components/layout/layout";
import { parseCookies } from 'nookies'
import getMenu, { MenuEnum } from "../../../components/default";
import { useAppDispatch, useAppSelector } from "../../../src/store/hooks";
import { useForm } from "react-hook-form";
import { PersistProduction, PersistProductionCost, GetProductionCost, GetProduction } from "../../../src/dto/production.dto";
import { getProductionByEventId, persistProduction } from "../../../services/api.production";
import { asyncSetProductions } from "../../../src/store/event.store";

const ProductionPage = () => {

  // Context
  const controller = useAppSelector(state => state.controller);
  const event = useAppSelector(state => state.event);
  const dispatch = useAppDispatch();
  // State
  const [productionCost, setProductionCost] = useState<PersistProductionCost[]>([] as PersistProductionCost[]);
  // Hook-Form
  const { getValues, register, setValue, handleSubmit } = useForm<PersistProduction>();
  const { getValues: pcGetValue, register: pcRegister, setValue: pcSetValue, handleSubmit: pcHandleSubmit } = useForm<PersistProductionCost>();

  /* Methods */

  useEffect(() => {
    loadProduction();
  }, [controller.selected_event.id!])

  const productionFormHandleSubmit = async () => {
    setValue("productionCost", productionCost);
    await persistProduction(getValues()).then(res => {
      loadProduction();
    }).catch(err => {
      console.error(err);
    })
  }

  const loadProduction = () => {
    dispatch(asyncSetProductions(controller.selected_event.id));
  }

  const costFormHandleSubmit = () => {
    setProductionCost([...productionCost, pcGetValue()]);
  }

  return (
    <div>
      <h1>Production</h1>
      <form onSubmit={handleSubmit(productionFormHandleSubmit)}>
        <label>Name:</label><br />
        <input type={"text"} {...register("name")} /><br />
        <label>Staff Quantity:</label><br />
        <input type={"number"} {...register("staffQuantity")} /><br />
        <label>Cache:</label><br />
        <input type={"number"} {...register("financial.value")} /><br />
        <input type={"hidden"} {...register("eventId")} value={controller.selected_event.id!} /><br />
        <button type={"submit"} >Cadastrar</button>
      </form>
      <h2>ProductionCosts</h2>
      <form onSubmit={pcHandleSubmit(costFormHandleSubmit)}>
        <label>Name:</label><br />
        <input type={"text"} {...pcRegister("name")} /><br />
        <label>Quantity:</label><br />
        <input type={"number"} {...pcRegister("quantity")} /><br />
        <label>Cost:</label><br />
        <input type={"number"} {...pcRegister("financial.value")} /><br />
        <button type={"submit"} >Cadastrar</button>
      </form>
    </div>
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