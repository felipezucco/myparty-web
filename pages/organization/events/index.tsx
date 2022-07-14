import { AxiosError } from "axios";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { parseCookies } from "nookies";
import { ReactElement, useEffect } from "react";
import { useForm } from "react-hook-form";
import getMenu from "../../../components/default";
import LayoutComponent from "../../../components/layout/layout";
import { persistEvent } from "../../../services/api.event";
import { GetEvent, PersistEvent } from "../../../src/dto/event.dto";
import { useAppDispatch, useAppSelector } from "../../../src/store/hooks";
import { asyncSetEvents, asyncSetHouses } from "../../../src/store/organization_ctx.store";

const Event = () => {

  //context
  const organization_ctx = useAppSelector((state) => state.organization_ctx);
  const dispatch = useAppDispatch();

  //form-hook
  const { register, handleSubmit, setValue, getValues } = useForm<PersistEvent>();

  useEffect(() => {
    dispatch(asyncSetHouses(organization_ctx.selected_organization.id!));
  }, [organization_ctx.selected_organization.id])

  const handleSubmitForm = async () => {
    await persistEvent(getValues()).then(res => {
      alert("Event created successfully.");
      dispatch(asyncSetEvents(organization_ctx.selected_organization.id!));
    }).catch((err: AxiosError) => {
      console.error(err);
      alert("Failed to create event. See log for more.");
    })
  }

  const EventsList = () => {
    return (
      <ul>
        {organization_ctx.events.map(event => {
          return <li key={event.id}>{event.name} / {event.date} - {event.house?.name}</li>
        })}
      </ul>
    )
  }

  const HouseSelectComponent = () => {
    return (
      <>
        <label htmlFor="house">House</label>
        <select id="house" onChange={(e) => setValue("houseId", Number.parseInt(e.currentTarget.value))}>
          {organization_ctx.houses.map((house, idx) => {
            { idx === 0 ? setValue("houseId", house.id!) : "" }
            return (
              <option selected={idx === 0} key={house.id} value={house.id} >
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
        <form method="post" onSubmit={handleSubmit(handleSubmitForm)}>
          <label htmlFor="name">Name</label>
          <input id="name" type={"text"} {...register("name")}></input><br />
          <label htmlFor="date">Date</label>
          <input id="date" type={"datetime-local"} {...register("date")} pattern="[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}"></input><br />
          <HouseSelectComponent /><br />
          <input type={"hidden"} {...register("organizationId")} value={organization_ctx.selected_organization.id!} />
          <button type={"submit"}>Create</button>
        </form>
        <EventsList />
      </div>
    </>
  )
}

Event.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutComponent name={getMenu("Events")}>
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