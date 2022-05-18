import { AxiosError } from "axios";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { parseCookies } from "nookies";
import { InputText } from "primereact/inputtext";
import { FunctionComponent, ReactElement, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import LayoutComponent from "../../components/Layout/layout";
import { persistEvent } from "../../services/api.event";
import { getHouses } from "../../services/api.house";
import { getLocals } from "../../services/api.local";
import { EventDTO } from "../../src/dto/event.dto";
import { HouseDTO } from "../../src/dto/house.dto";
import { LocalDTO } from "../../src/dto/local.dto";
import { useAppSelector } from "../../src/store/hooks";

const Event = () => {

  //context
  const organization = useAppSelector((state) => state.organization_ctx);

  //states
  const [houseList, setHouseList] = useState<HouseDTO[]>([]);

  //form-hook
  const { register, handleSubmit, setValue, getValues } = useForm<EventDTO>();

  useEffect(() => {
    loadHouseList();
  }, [])

  const loadHouseList = async () => {
    return await getHouses().then(res => {
      setHouseList(res.data)
    }).catch((err: AxiosError) => {
      alert("Error to load house list.")
    })
  }

  const handleSubmitForm = async () => {
    //set organization into form-hook
    setValue("organization", organization.organization);
    console.log(getValues())
    await persistEvent(getValues()).then(res => {
      alert("Event created successfully.");
    }).catch((err: AxiosError) => {
      console.error(err);
      alert("Failed to create event. See log for more.");
    })
  }

  const HouseSelectComponent = () => {
    return (
      <>
        <label htmlFor="house">House</label>
        <select id="house" onChange={(e) => {
          setValue("house", houseList.filter(h => h.id === Number.parseInt(e.currentTarget.value))[0]);
        }}>
          <option selected value={0}>
            Select a house
          </option>
          {houseList.map(house => {
            return (
              <option key={house.id} value={house.id}>
                {house.name} ({house.local?.city} - {house.local?.state}) : {house.zones?.length} zones
              </option>
            )
          })}
        </select>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Tendel FC Web | Eventos</title>
      </Head>
      <div>
        <h1>Eventos</h1>
        <form method="post" onSubmit={handleSubmit(handleSubmitForm)}>
          <label htmlFor="name">Name</label>
          <input id="name" type={"text"} {...register("name")}></input><br />
          <label htmlFor="date">Date</label>
          <input type="hidden" id="timezone" name="timezone" value="-08:00"></input>
          <input id="date" type={"datetime-local"} {...register("date")} pattern="[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}"></input><br />
          <HouseSelectComponent /><br />
          <button type={"submit"}>Create</button>
        </form>
      </div>
    </>
  )
}

Event.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutComponent>
      {page}
    </LayoutComponent>
  )
}

export default Event;

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