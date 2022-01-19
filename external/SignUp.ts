import { AxiosError } from 'axios';
import { api } from './API';

export type SignUpFormType = {
  username: string,
  password: string,
  email: string,
  name: string
}

export async function signUp(account: SignUpFormType) {
  return await api.post('/account/', JSON.stringify(account), {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(data => data).catch((error: AxiosError) => alert(error.response?.data.error))
}