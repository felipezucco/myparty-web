import { AxiosError } from "axios";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { parseCookies } from "nookies";
import { ReactElement, useEffect } from "react";
import { useForm } from "react-hook-form";
import getMenu from "../../../components/default";
import EventView from "../../../components/event/event_view/event_view";
import LayoutComponent from "../../../components/layout/layout";
import { persistEvent } from "../../../services/api.event";
import { GetEvent, PersistEvent } from "../../../src/dto/event.dto";
import { useAppDispatch, useAppSelector } from "../../../src/store/hooks";
import { asyncSetEvents, asyncSetHouses } from "../../../src/store/organization.store";

const EventPage = () => {

  // Context
  const controller = useAppSelector((state) => state.controller);
  const organization = useAppSelector((state) => state.organization);
  const dispatch = useAppDispatch();

  /* Methods */

  useEffect(() => {
    dispatch(asyncSetHouses(controller.selected_organization.id!));
  }, [controller.selected_organization.id])

  const EventsList = () => {
    return (
      <ul>
        {organization.events.map(event => {
          return <li key={event.id}>{event.name} / {event.date} - {event.house?.name}</li>
        })}
      </ul>
    )
  }

  return (
    <>
      <Head>
        <title>Tendel FC Web | Eventos</title>
      </Head>
      <EventView events={organization.events} />
    </>
  )
}

EventPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutComponent name={getMenu("Events")}>
      {page}
    </LayoutComponent>
  )
}

export default EventPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { 'eventweb.token': token } = parseCookies(context);

  if (token) return { props: {} }
  else return {
    redirect: {
      destination: '/',
      permanent: false
    }
  }
}