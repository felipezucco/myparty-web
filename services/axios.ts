import axios, { Axios, AxiosError, AxiosRequestConfig, } from "axios";
import Router from "next/router";
import { parseCookies } from "nookies";

export const getAPIClient = (ctx?: any) => {

  const { 'eventweb.token': token } = parseCookies(ctx);

  const api = axios.create({
    baseURL: "http://localhost:8080/"
  });

  api.interceptors.response.use((response) => response, (error: AxiosError) => {
    //console.log('error code', error.response.status);
    if (error.response?.status === 401) {
      api.defaults.headers.common['Authorization'] = "";
      Router.push("/auth/invalid_auth");
    }
  })

  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  return api;
}