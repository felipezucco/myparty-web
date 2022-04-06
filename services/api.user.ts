import { AxiosResponse } from 'axios';
import { btoa } from 'buffer';
import { LocalType } from '../models/LocalType';
import api from './api';

const LOCAL_API = '/api/user';

export async function getUserByEmail(data: string): Promise<AxiosResponse<String[]>> {
  return await api.get(LOCAL_API + '/s', {
    params: {
      q: encodeURIComponent(Buffer.from('email').toString('base64')),
      v: encodeURIComponent(Buffer.from(data).toString('base64'))
    }
  });
}