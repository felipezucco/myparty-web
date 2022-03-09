import { ReactElement, useEffect, useState } from "react";
import CreateZoneComponent from "./create";
import LayoutComponent from "../../components/Layout/Layout";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import Dialog from '@mui/material/Dialog';
import Button from "@mui/material/Button";
import CreateLocal from "../local/create";
import { LocalType } from "../../models/LocalType";
import { getLocals } from "../../services/api.local";
import { AxiosError } from "axios";

const ZonesComponent = () => {

  const [showCreateZone, setShowCreateZone] = useState(false);
  const [showCreateLocal, setShowCreateLocal] = useState(false);
  const [locals, setLocals] = useState<LocalType[]>([] as LocalType[])

  useEffect(() => {
    loadLocals();
  }, [])

  async function loadLocals() {
    await getLocals().then(res => setLocals(res.data)).catch((err: AxiosError) => console.error(err.response?.data));
  }

  const Dialogs = () => {
    return (<>
      <Dialog open={showCreateZone}>
        <CreateZoneComponent show={setShowCreateZone} />
      </Dialog>
      <Dialog open={showCreateLocal}>
        <CreateLocal show={setShowCreateLocal} onClose={loadLocals} />
      </Dialog>
    </>)
  }

  return (
    <>
      <Button onClick={() => setShowCreateZone(true)} variant="outlined" >Novo Ambiente</Button>
      <Button onClick={() => setShowCreateLocal(true)} variant="outlined" >Novo Local</Button>
      <ul>
        {locals.map(local => {
          return <li key={local.id}>{`${local.id} - ${local.state}, ${local.city}, ${local.aisle}`}</li>;
        })}
      </ul>
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