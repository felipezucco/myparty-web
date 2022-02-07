import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { Zone } from "../../models/Zone.type";
import { SubmitHandler, useForm } from "react-hook-form";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

const CreateZoneComponent = () => {

  const { register, handleSubmit } = useForm<Zone>();
  const [zone, setZone] = useState<Zone>();

  const handleSubmitForm = (data: any): SubmitHandler<Zone> => {
    console.log(data)
    return data;
  }

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <div className="p-grid">
        <div className="p-col">
          <label htmlFor="zoneName" className="p-d-block">Nome do Ambiente</label>
          <InputText id="zoneName" {...register('name')}
            className="p-d-block" onChange={(e) => setZone({ ...zone, name: e.target.value })} />
        </div>
        <div className="p-col">
          <label htmlFor="zoneMetric" className="p-d-block">Metragem</label>
          <InputText id="zoneMetric" {...register('metric')} value={zone?.metric?.toString()} />
        </div>
        <div className="p-col">
          <label htmlFor="zoneColor" className="p-d-block">Cor</label>
          <input type={'color'} {...register('color')} />
        </div>
      </div>
      <button>Teste</button>
    </form>
  );
}

export default CreateZoneComponent;

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