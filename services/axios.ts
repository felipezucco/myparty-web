import axios, { Axios, AxiosError, AxiosRequestConfig, } from "axios";
import Router from "next/router";
import { parseCookies } from "nookies";


export const getAuthApi = () => axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_MYPARTY_API}`
});

export const getAPIClient = (ctx?: any) => {
  const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_MYPARTY_API}`
  });

  const { 'eventweb.token': token } = parseCookies(ctx);

  api.interceptors.response.use((response) => response, (error: AxiosError) => {
    console.error('Api erro', error);
    if (error.response?.status === 401) {
      api.defaults.headers.common['Authorization'] = "";
      Router.push("/");
    }
  })

  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  return api;
}