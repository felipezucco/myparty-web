import { GetLocal } from './../src/dto/local.dto';
import { AxiosResponse } from 'axios';
import { LocalType } from '../models/LocalType';
import api from './api';

const LOCAL_API = '/api/local';

export async function persistLocal(data: GetLocal) {
  return await api.post(LOCAL_API, data);
}

export async function getLocals(): Promise<AxiosResponse<GetLocal[]>> {
  return await api.get(LOCAL_API);
}

export async function getLocalsByOrganizationId(id: number): Promise<AxiosResponse<GetLocal[]>> {
  return await api.get(LOCAL_API + `/org/${id}`);
}