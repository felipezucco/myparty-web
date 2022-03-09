import { AxiosResponse } from 'axios';
import { LocalType } from '../models/LocalType';
import api from './api';

const LOCAL_API = '/api/local';

export async function persistLocal(data: LocalType) {
  return await api.post(LOCAL_API, data);
}

export async function getLocals(): Promise<AxiosResponse<LocalType[]>> {
  return await api.get(LOCAL_API);
}