import { GetServerSideProps } from "next";
import Head from "next/head";
import { parseCookies } from "nookies";
import { InputText } from "primereact/inputtext";
import { FunctionComponent, ReactElement } from "react";
import { useForm } from "react-hook-form";
import LayoutComponent from "../../components/Layout/layout";

const Event = () => {

  const { register, handleSubmit } = useForm();

  return (
    <>
      <Head>
        <title>Tendel FC Web | Eventos</title>
      </Head>
      <div>
        <h1>Eventos</h1>
        <form>
          <label htmlFor="name">Name</label>
          <input id="name" type={"text"}></input><br />
          <label htmlFor="date">Date</label>
          <input id="date" type={"datetime-local"}></input>
        </form>
      </div>
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