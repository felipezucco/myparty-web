import axios from "axios";
import { parseCookies } from "nookies";

export const getAPIClient = (ctx?: any) => {

  const { 'eventweb.token': token } = parseCookies(ctx);

  const api = axios.create({
    baseURL: "http://localhost:8080/"
  });

  api.interceptors.request.use(config => {
    console.log(config)
    return config;
  })

  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  return api;
}