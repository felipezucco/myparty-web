import { AxiosError, AxiosResponse } from 'axios';
import { api } from './API';

export type SignUpFormType = {
  username: string,
  password: string,
  email: string,
  name: string
}

export async function signUp(account: SignUpFormType): Promise<AxiosResponse<any, any>> {
  return await api.post('/account/', JSON.stringify(account), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}