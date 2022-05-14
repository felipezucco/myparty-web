import { AxiosError, AxiosResponse } from "axios";
import { api } from "./api";

export type SignUpFormType = {
  username: string,
  password: string,
  email: string,
  name: string
}

const ENDPOINT = "/api/user";

export async function signUp(account: SignUpFormType): Promise<AxiosResponse<any, any>> {
  return await api.post(ENDPOINT, JSON.stringify(account), {
    headers: {
      "Content-Type": "application/json"
    }
  });
}