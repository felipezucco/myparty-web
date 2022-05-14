import React, { ReactElement, useEffect, useState } from "react";
import LayoutComponent from "../../components/Layout/layout";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import Dialog from '@mui/material/Dialog';
import Button from "@mui/material/Button";
import { HouseType } from "../../models/LocalType";
import { getLocals } from "../../services/api.local";
import { AxiosError } from "axios";
import HouseCard from "../../components/Content/Card/House/HouseCard";
import { deleteHouse, getHouseById, getHouses } from "../../services/api.house";
import HouseView from "../../components/Content/View/House/HouseView";
import HouseForm from "../../components/Content/Form/House/HouseForm";
import EventForm from "../../components/Content/Form/Event/EventForm";
import { getEvents } from "../../services/api.event";
import OrganizationForm from "../../components/Content/Form/Organization";

const ZonesComponent = () => {

  const [openHouseForm, setOpenHouseForm] = useState(false);
  const [openEventForm, setOpenEventForm] = useState(false);
  const [openOrganizetionForm, setOpenOrganizationForm] = useState(false);
  const [showHouse, setShowHouse] = useState(false);
  const [selectedHouse, setSelectedHouse] = useState<number | undefined>();
  const [houses, setHouses] = useState<HouseType[]>([] as HouseType[])

  useEffect(() => {
    loadHouses();
    loadEvents();
  }, [])

  async function loadHouses() {
    await getHouses().then(res => {
      console.log(res.data);
      setHouses(res.data);
    }).catch((err: AxiosError) => console.error(err.response?.data));
  }

  async function loadEvents() {
    await getEvents().then(res => {
      console.log(res.data);
    }).catch((err: AxiosError) => console.error(err.response?.data));
  }

  async function handleDeleteHouse(id: number) {
    await deleteHouse(id).then(res => {
      loadHouses();
    }).catch((err: AxiosError) => console.error(err.response?.data));
  }

  const Dialogs = () => {
    return (<>
      <HouseView show={showHouse} handleShowDialog={setShowHouse} houseId={selectedHouse} />
      <HouseForm status={openHouseForm} onClose={() => loadHouses()} setStatus={setOpenHouseForm} />
      <EventForm status={openEventForm} setStatus={setOpenEventForm} />
      <OrganizationForm status={openOrganizetionForm} setStatus={setOpenOrganizationForm} />
    </>)
  }

  return (
    <>
      <Button onClick={() => setOpenHouseForm(true)} variant="outlined" >Novo Local</Button>
      <Button onClick={() => setOpenEventForm(true)} variant="outlined" >Novo Evento</Button>
      <Button onClick={() => setOpenOrganizationForm(true)} variant="outlined" >Nova Organização</Button>
      <div style={{ display: 'flex', flexWrap: 'wrap', width: '1000px', justifyContent: 'start', gap: '10px', padding: '10px' }}>
        {houses.map(house => {
          return <HouseCard key={house.id} house={house}
            handleDeleteHouse={handleDeleteHouse}
            handleSelectHouse={setSelectedHouse}
            handleShowHouse={setShowHouse} />
        })}
      </div>
      <Dialogs />
    </>
  );
}

/*ServerSide ----*/

ZonesComponent.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutComponent>
      {page}
    </LayoutComponent>
  )
}

export default ZonesComponent;

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