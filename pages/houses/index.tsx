import { AxiosError } from "axios";
import { useState, useEffect, ReactElement } from "react";
import { useForm } from "react-hook-form";
import LayoutComponent from "../../components/Layout/layout";
import { persistHouse } from "../../services/api.house";
import { getLocals } from "../../services/api.local";
import { EventDTO } from "../../src/dto/event.dto";
import { HouseDTO } from "../../src/dto/house.dto";
import { LocalDTO } from "../../src/dto/local.dto";
import { ZoneDTO } from "../../src/dto/zone.dto";
import { useAppDispatch, useAppSelector } from "../../src/store/hooks";
import { asyncSetLocals } from "../../src/store/organization_ctx.store";

const Houses = () => {

  //contexts
  const organization_ctx = useAppSelector((state) => state.organization_ctx);
  const dispatch = useAppDispatch();

  // states
  // const [localList, setLocalList] = useState<LocalDTO[]>([]);
  const [zoneList, setZoneList] = useState<ZoneDTO[]>([]);

  //form-state
  const { register, handleSubmit, setValue, getValues } = useForm<HouseDTO>();
  const { register: zoneRegister, handleSubmit: zoneHandleSubmit } = useForm<ZoneDTO>();

  useEffect(() => {
    if (organization_ctx.organization.id)
      dispatch(asyncSetLocals(organization_ctx.organization.id));
  }, [organization_ctx.organization])

  const handleSubmitForm = async () => {
    setValue("zones", zoneList);
    await persistHouse(getValues()).then(res => {
      alert("House created successfully");
    }).catch((err: AxiosError) => {
      alert("Failed to create house. See log for more.");
      console.error(err.message);
    })
  }

  const LocalSelectComponent = () => {
    return (
      <>
        <label htmlFor="local">Local</label>
        <select id="local" onChange={(e) =>
          setValue("local", organization_ctx.locals.filter(local => local.id === Number.parseInt(e.currentTarget.value))[0])}>
          {organization_ctx.locals.map(local => {
            return (
              <option key={local.id} value={local.id}>
                {local.city} - {local.state}: {local.aisle}, {local.block}, {local.number}, {local.complement} ({local.code})
              </option>
            )
          })}
        </select>
      </>
    )
  }

  const addZoneHandleSubmit = (data: ZoneDTO) => {
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
    </div>
  )
}
export default Houses;

Houses.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutComponent>
      {page}
    </LayoutComponent>
  )
}