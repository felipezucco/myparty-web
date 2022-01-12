import Link from "next/link";
import { Button } from "primereact/button";
import { FunctionComponent, ReactElement, useState } from "react";
import { Dialog } from 'primereact/dialog';
import CreateLocal from "../local";
import CreateZoneComponent from "./create";
import LayoutComponent from "../../comps/Layout/Layout";

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