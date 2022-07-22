import { GetAction, PersistAction } from '../src/dto/action.dto';
import { PersistVisual, GetVisual } from '../src/dto/visual.dto';
import { AxiosResponse } from 'axios';
import api from './api';

const ENDPOINT = "/api/action";

export const persistAction = async (action: PersistAction): Promise<AxiosResponse<void>> => {
  return await api.post(ENDPOINT, action);
}

export const removeAction = async (actionId: number): Promise<AxiosResponse<boolean>> => {
  return await api.delete(ENDPOINT + `/${actionId}`);
}

export const getActionByEventId = async (eventId: number): Promise<AxiosResponse<GetAction[]>> => {
  return await api.get(ENDPOINT + `/event/${eventId}`);
}
