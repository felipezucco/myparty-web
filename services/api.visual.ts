import { PersistVisual, GetVisual } from './../src/dto/visual.dto';
import { AxiosResponse } from 'axios';
import api from './api';

const ENDPOINT = "/api/visual";

export const persistVisual = async (visual: PersistVisual): Promise<AxiosResponse<void>> => {
  return await api.post(ENDPOINT, visual);
}

export const removeVisual = async (visualId: number): Promise<AxiosResponse<Boolean>> => {
  return await api.delete(ENDPOINT + `/${visualId}`);
}

export const getVisualByEventId = async (eventId: number): Promise<AxiosResponse<GetVisual[]>> => {
  return await api.get(ENDPOINT + `/event/${eventId}`);
}