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
import { asyncSetEvents, asyncSetHouses } from "../../../src/store/organization.store";

const NewEventPage = () => {

  // Context
  const controller = useAppSelector((state) => state.controller);
  const organization = useAppSelector((state) => state.organization);
  const dispatch = useAppDispatch();
  // Horm-Fook
  const { register, handleSubmit, setValue, getValues } = useForm<PersistEvent>();

  /* Methods */

  useEffect(() => {
    dispatch(asyncSetHouses(controller.selected_organization.id!));
  }, [controller.selected_organization.id])

  const handleSubmitForm = async () => {
    await persistEvent(getValues()).then(res => {
      alert("Event created successfully.");
      dispatch(asyncSetEvents(controller.selected_organization.id!));
    }).catch((err: AxiosError) => {
      console.error(err);
      alert("Failed to create event. See log for more.");
    })
  }

  const HouseSelectComponent = () => {
    return (
      <>
        <label htmlFor="house">House</label>
        <select id="house" onChange={(e) => setValue("houseId", Number.parseInt(e.currentTarget.value))}>
          {organization.houses.map((house, idx) => {
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
          <input type={"hidden"} {...register("organizationId")} value={controller.selected_organization.id!} />
          <button type={"submit"}>Create</button>
        </form>
      </div>
    </>
  )
}

NewEventPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutComponent name={getMenu("Events")}>
      {page}
    </LayoutComponent>
  )
}

export default NewEventPage;

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