import { ReactElement, useState } from "react";
import CreateZoneComponent from "./create";
import LayoutComponent from "../../comps/Layout/Layout";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import Dialog from '@mui/material/Dialog';
import Button from "@mui/material/Button";

const ZonesComponent = () => {

  const [display, setDisplay] = useState(false);

  return (
    <>
      <Button onClick={() => setDisplay(true)} >Novo Ambiente</Button>
      <Dialog open={display}>
        <CreateZoneComponent show={setDisplay} />
      </Dialog>
    </>
  );
}

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