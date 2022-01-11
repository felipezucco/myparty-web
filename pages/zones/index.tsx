import Link from "next/link";
import { Button } from "primereact/button";
import { FunctionComponent } from "react";

interface ZonesComponentProps {

}

const ZonesComponent: FunctionComponent<ZonesComponentProps> = () => {
  return (
    <>
      <Link href={'/zones/create'}>
        <Button label="Novo Ambiente" icon="pi pi-add" iconPos="right" />
      </Link>
    </>
  );
}

export default ZonesComponent;