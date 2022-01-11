import Head from "next/head";
import { InputText } from "primereact/inputtext";
import { FunctionComponent } from "react";

interface EventProps { }

const Event: FunctionComponent<EventProps> = () => {
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

export default Event;