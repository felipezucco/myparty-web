import axios from "axios";
import { parseCookies } from "nookies";

export const getAPIClient = (ctx?: any) => {

  const { 'eventweb.token': token } = parseCookies(ctx);

  const api = axios.create({
    baseURL: "http://localhost:8080/"
  });

  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  return api;
}