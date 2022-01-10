import { Dropdown, DropdownChangeParams } from 'primereact/dropdown';
import { FormEventHandler, FunctionComponent, useEffect, useRef, useState } from 'react';
import { Local } from '../../models/Local.type';
import { Card } from 'primereact/card';
import { InputMask } from 'primereact/inputmask';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { getCEP, getCities, getUFs } from '../../external/DadosIBGE';
import { saveLocal } from '../../external/API';
import Head from 'next/head';

interface LabelValue {
  label: string,
  value: number
}

interface CreateLocalInterface { }

const CreateLocal: FunctionComponent<CreateLocalInterface> = () => {

  const toast = useRef<Toast>(null);
  const [buffer, setBuffer] = useState<Local>();
  const [UFList, setUFList] = useState<LabelValue[]>([]);
  const [CitiesList, setCitiesList] = useState<LabelValue[]>([]);
  const [UFSelected, setUFSelected] = useState<number>();
  const [CitySelected, setCitySelected] = useState<number>();
  const [CEP, setCEP] = useState<string>();
  const [localization, setLocalization] = useState<Local>();
  const [send, setSend] = useState(false);

  useEffect(() => {
    getUFs().then(data => setUFList(data.map((uf): LabelValue => ({
      label: uf.nome,
      value: uf.id
    }))));
  }, [])

  useEffect(() => {
    if (UFSelected)
      getCities(UFSelected).then(data => setCitiesList(data.map((ct): LabelValue => ({
        label: ct.nome,
        value: ct.id
      }))));
  }, [UFSelected])

  useEffect(() => {
    if (CEP) {
      let searchCEP = CEP.replaceAll('-', '').replaceAll('_', '');
      if (searchCEP.length === 8) {
        getCEP(searchCEP).then(data => setLocalization({
          city: data.localidade,
          aisle: data.logradouro,
          code: String(data.cep).replaceAll('-', ''),
          uf: data.uf
        }));
      }
    }
  }, [CEP])

  const callSaveLocal = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSend(true);

    if (localization) {
      setTimeout(() => saveLocal(localization).then(e => e === 201 ? successSend() : alert('Erro: ' + e)), 2000)
    }
  }

  const successSend = () => {
    setSend(false);
    if (toast.current)
      toast.current.show({ severity: 'success', summary: 'Success Message', detail: 'Message Content', life: 3000 });
  }

  return (
    <>
      <Head>
        <title>Tendel FC Web | Locais</title>
      </Head>
      <Toast ref={toast} />
      <form method='POST' onSubmit={(e) => callSaveLocal(e)}>
        <div className="p-d-flex p-flex-column p-p-3">
          <div className="p-mb-2">
            <Dropdown className='default-width' value={UFSelected} options={UFList} onChange={(e) => setUFSelected(e.value)} placeholder="Selecione a UF" />
          </div>
          <div className="p-mb-2">
            <Dropdown className='default-width' value={CitySelected} options={CitiesList} onChange={(e) => setCitySelected(e.value)} placeholder="Selecione a cidade" emptyMessage="Selecione uma UF" />
          </div>
          <div className="p-mb-2">
            <InputMask id="cep" mask="99999-999" value={CEP} placeholder="CEP" onChange={(e) => setCEP(e.value)} required></InputMask>
          </div>
          <div className="p-mt-5">
            <span className="p-float-label">
              <InputText className='default-width' id="in" value={localization?.aisle} disabled />
              <label htmlFor="in">Logradouro</label>
            </span>
          </div>
          <div className="p-mt-5">
            <span className="p-float-label">
              <InputText className='default-width' id="in" value={localization?.city} disabled />
              <label htmlFor="in">Localidade</label>
            </span>
          </div>
          <div className="p-mt-5">
            <span className="p-float-label">
              <InputText className='default-width' id="in" value={''} disabled />
              <label htmlFor="in">Bairro</label>
            </span>
          </div>
          <div className="p-mt-5">
            <InputText value={localization?.number} onChange={(e) => setLocalization({ ...localization, number: Number.parseInt(e.target.value) })} />
          </div>
        </div>
        <Button label="Submit" icon="pi pi-check" loading={send} />
      </form>
    </>
  )
}

export default CreateLocal;