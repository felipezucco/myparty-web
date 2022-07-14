import { GetServerSideProps } from "next";
import { ReactElement, useEffect, useState } from "react";
import LayoutComponent from "../../../components/layout/layout";
import { parseCookies } from 'nookies'
import getMenu, { MenuEnum } from "../../../components/default";
import { useAppSelector } from "../../../src/store/hooks";
import { useForm } from "react-hook-form";
import { PersistProduction, PersistProductionCost, GetProductionCost, GetProduction } from "../../../src/dto/production.dto";
import { getProductionByEventId, persistProduction } from "../../../services/api.production";

const ProductionPage = () => {

  // Context
  const organization_ctx = useAppSelector(state => state.organization_ctx);

  // State
  const [productions, setProductions] = useState<GetProduction[]>([] as GetProduction[]);

  // Hook-Form
  const { getValues, register, setValue, handleSubmit } = useForm<PersistProduction>();
  const { getValues: pcGetValue, register: pcRegister, setValue: pcSetValue, handleSubmit: pcHandleSubmit } = useForm<PersistProductionCost>();

  useEffect(() => {
    loadProduction();
  }, [organization_ctx.selected_event.id!])

  const productionFormHandleSubmit = async () => {
    console.log(getValues());
    await persistProduction(getValues()).then(res => {
      console.log('res', res),
        loadProduction();
    }).catch(err => {
      console.error(err);
    })
  }

  const loadProduction = async () => {
    await getProductionByEventId(organization_ctx.selected_event.id!)
      .then(res => {
        console.log("res", res.data);
        setProductions(res.data);
      })
      .catch(err => console.error("error on loading production", err));
  }

  const costFormHandleSubmit = () => {
    console.log(getValues());
    if (!getValues().productionCost) {
      setValue("productionCost", []);
    }
    setValue("productionCost", [...getValues().productionCost, pcGetValue()])
    console.log(pcGetValue());
  }

  const ProductionList = () => {
    return (
      <ul>
        {productions.map(prod => {
          return <li key={prod.id}>{prod.name} - R$ {prod.financial?.value}</li>
        })}
      </ul>
    )
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
        <input type={"hidden"} {...register("eventId")} value={organization_ctx.selected_event.id!} /><br />
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
      <ProductionList />
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