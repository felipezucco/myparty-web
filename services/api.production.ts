import { PersistProduction, GetProduction } from './../src/dto/production.dto';
import { AxiosResponse } from 'axios';
import api from './api';

const ENDPOINT = "/api/production";

export const persistProduction = async (production: PersistProduction): Promise<AxiosResponse<void>> => {
  return await api.post(ENDPOINT, production);
}

export const removeProduction = async (id: number): Promise<AxiosResponse<Boolean>> => {
  return await api.delete(ENDPOINT + `/${id}`);
}

export const getProductionByEventId = async (eventId: number): Promise<AxiosResponse<GetProduction[]>> => {
  return await api.get(ENDPOINT + `/event/${eventId}`);
}