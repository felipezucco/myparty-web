import { AxiosError } from "axios";
import { useState, useEffect, ReactElement } from "react";
import { useForm } from "react-hook-form";
import LayoutComponent from "../../../components/layout/layout";
import getMenu from "../../../components/default";
import { persistHouse } from "../../../services/api.house";
import { PersistHouse } from "../../../src/dto/house.dto";
import { PersistZone } from "../../../src/dto/zone.dto";
import { useAppDispatch, useAppSelector } from "../../../src/store/hooks";
import { asyncSetHouses, asyncSetLocals } from "../../../src/store/organization_ctx.store";
import Router from "next/router";


const NewHousePage = () => {

  // Contexts
  const organization_ctx = useAppSelector(state => state.organization_ctx);
  const dispatch = useAppDispatch();
  // States
  const [zoneList, setZoneList] = useState<PersistZone[]>([]);
  // Hook-Form
  const { register, handleSubmit, setValue, getValues } = useForm<PersistHouse>();
  const { register: zoneRegister, handleSubmit: zoneHandleSubmit } = useForm<PersistZone>();

  /* Methods */

  useEffect(() => {
    dispatch(asyncSetLocals(organization_ctx.selected_organization.id!));
    dispatch(asyncSetHouses(organization_ctx.selected_organization.id!));
  }, [organization_ctx.selected_organization])

  const handleHouseSubmitForm = async () => {
    setServerSideValues();
    console.log(getValues())
    await persistHouse(getValues()).then(res => {
      alert("House created successfully");
      dispatch(asyncSetHouses(organization_ctx.selected_organization.id!));
      Router.push("/organization/houses");
    }).catch((err: AxiosError) => {
      alert("Failed to create house. See log for more.");
      console.error(err.message);
    })
  }

  const setServerSideValues = () => {
    setValue("zones", zoneList);
    setValue("local.organizationId", organization_ctx.selected_organization.id);
  }

  const LocalFormComponent = () => {
    return (
      <>
        <label htmlFor="aisle">Aisle</label>
        <input type={"text"} {...register("local.aisle")} required /><br />
        <label htmlFor="block">Block</label>
        <input type={"text"} {...register("local.block")} required /><br />
        <label htmlFor="city">City</label>
        <input type={"text"} {...register("local.city")} required /><br />
        <label htmlFor="code">Code</label>
        <input type={"text"} {...register("local.code")} required /><br />
        <label htmlFor="complement">Complement</label>
        <input type={"text"} {...register("local.complement")} /><br />
        <label htmlFor="number">Number</label>
        <input type={"number"} {...register("local.number")} /><br />
        <label htmlFor="number">State</label>
        <input type={"text"} {...register("local.state")} maxLength={2} required /><br />
      </>
    )
  }

  const addZoneHandleSubmit = (data: PersistZone) => {
    setZoneList([...zoneList, data]);
  }

  const ZonesComponent = () => {
    return (
      <form method="post" onSubmit={zoneHandleSubmit(addZoneHandleSubmit)}>
        <label htmlFor="zone_name">Name</label>
        <input id="zone_name" {...zoneRegister("name")} /><br />
        <label htmlFor="zone_size">Size</label>
        <input id="zone_size" type={"number"} {...zoneRegister("size")} /><br />
        <button type={"submit"}>Add Zone</button>
      </form>
    )
  }

  const ZoneListComponent = () => {
    return (
      <ul>
        {zoneList.map((zone, idx) => {
          return <li key={idx}>Zone: {zone.name}, Size: {zone.size} m²</li>
        })}
      </ul>
    )
  }

  return (
    <div>
      <form method="post" onSubmit={handleSubmit(handleHouseSubmitForm)}>
        <h1>Houses</h1>
        <label>
          Name:
          <input type={"text"} {...register("name")} />
        </label><br />
        <LocalFormComponent /><br />
        <button type={"submit"}>Create</button>
      </form>
      <h3>Zones</h3>
      <ZonesComponent />
      <ZoneListComponent />
    </div>
  )
}
export default NewHousePage;

NewHousePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutComponent name={getMenu("Houses")}>
      {page}
    </LayoutComponent>
  )
}