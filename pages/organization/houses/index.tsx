import { AxiosError } from "axios";
import { useState, useEffect, ReactElement } from "react";
import { useForm } from "react-hook-form";
import LayoutComponent from "../../../components/layout/layout";
import getMenu from "../../../components/default";
import { persistHouse } from "../../../services/api.house";
import { GetHouse, PersistHouse } from "../../../src/dto/house.dto";
import { PersistZone, GetZone } from "../../../src/dto/zone.dto";
import { useAppDispatch, useAppSelector } from "../../../src/store/hooks";
import { asyncSetHouses, asyncSetLocals } from "../../../src/store/organization_ctx.store";


const HousePage = () => {

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

  const handleSubmitForm = async () => {
    setValue("zones", zoneList);
    await persistHouse(getValues()).then(res => {
      alert("House created successfully");
      dispatch(asyncSetHouses(organization_ctx.selected_organization.id!));
    }).catch((err: AxiosError) => {
      alert("Failed to create house. See log for more.");
      console.error(err.message);
    })
  }

  const LocalSelectComponent = () => {
    return (
      <>
        <label htmlFor="local">Local</label>
        <select id="local" onChange={(e) => setValue("localId", Number.parseInt(e.target.value))}>
          {organization_ctx.locals.map((local, idx) => {
            { idx === 0 ? setValue("localId", local.id!) : "" }
            return (
              <option selected={idx === 0} key={local.id} value={local.id}>
                {local.city} - {local.state}: {local.aisle}, {local.block}, {local.number}, {local.complement} ({local.code})
              </option>
            )
          })}
        </select>
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

  const HousesList = () => {
    return (
      <ul>
        {organization_ctx.houses.map(house => {
          return (
            <li key={house.id}>
              {house.name} -
              {house.zones?.map(zone => {
                return <span key={zone.id}>{zone.name} ({zone.size} m²)</span>
              })}
            </li>)
        })}
      </ul>
    )
  }

  return (
    <div>
      <form method="post" onSubmit={handleSubmit(handleSubmitForm)}>
        <h1>Houses</h1>
        <label>
          Name:
          <input type={"text"} {...register("name")} />
        </label><br />
        <LocalSelectComponent /><br />
        <button type={"submit"}>Create</button>
      </form>
      <h3>Zones</h3>
      <ZonesComponent />
      <ZoneListComponent />
      <HousesList />
    </div>
  )
}
export default HousePage;

HousePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutComponent name={getMenu("Houses")}>
      {page}
    </LayoutComponent>
  )
}