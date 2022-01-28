import { AxiosError, AxiosResponse } from 'axios';
import { apiInstance } from './api';

export type SignUpFormType = {
  username: string,
  password: string,
  email: string,
  name: string
}

export async function signUp(account: SignUpFormType): Promise<AxiosResponse<any, any>> {
  return await apiInstance.post('/account/', JSON.stringify(account), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}