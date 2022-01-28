import { Localization } from '../models/Localization.type';
import { UF, City } from '../models/UF.type';
import axios from 'axios';

export const getUFs = async (): Promise<UF[]> => {
  return await axios.create({ baseURL: 'https://servicodados.ibge.gov.br/' })
    .get('api/v1/localidades/estados')
    .then(e => e.data)
    .catch(e => console.error('Erro ao buscar UFs', e));
}

export const getCities = async (id: number): Promise<City[]> => {
  return await axios.create({ baseURL: 'https://servicodados.ibge.gov.br/' })
    .get(`api/v1/localidades/estados/${id}/municipios`)
    .then(e => e.data)
    .catch(e => console.error('Erro ao buscar cidades', e));
}

export const getCEP = async (cep: string): Promise<any> => {
  return await axios.create({ baseURL: 'https://viacep.com.br/' })
    .get(`ws/${cep}/json`)
    .then(e => e.data)
    .catch(e => console.error('Erro ao buscar CEP', e));
}