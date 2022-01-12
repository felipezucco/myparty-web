import Head from "next/head";
import { InputText } from "primereact/inputtext";
import { FunctionComponent, ReactElement } from "react";
import LayoutComponent from "../../comps/Layout/Layout";

const Event = () => {
  return (
    <>
      <Head>
        <title>Tendel FC Web | Eventos</title>
      </Head>
      <form method="POST">
        <div>
          <label htmlFor="eventName" className="p-d-block">Nome do Evento</label>
          <InputText id="eventName" aria-describedby="username1-help" className="p-d-block" />
        </div>
      </form>
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