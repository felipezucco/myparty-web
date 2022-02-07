import Link from "next/link";
import { Button } from "primereact/button";
import { FunctionComponent, ReactElement, useState } from "react";
import { Dialog } from 'primereact/dialog';
import CreateLocal from "../local";
import CreateZoneComponent from "./create";
import LayoutComponent from "../../comps/Layout/Layout";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

const ZonesComponent = () => {

  const [display, setDisplay] = useState(false);

  return (
    <>
      <Button label="Novo Ambiente" icon="pi pi-add" iconPos="right" onClick={() => setDisplay(true)} />
      {/* <Link href={'/zones/create'}>
        <Button label="Novo Ambiente" icon="pi pi-add" iconPos="right" />
      </Link> */}
      <Dialog header="Novo Ambiente" visible={display} style={{ width: '50vw' }} onHide={() => setDisplay(false)}>
        <CreateZoneComponent />
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