import { Local } from '../models/Local.type';
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080/",
});

export const getLocals = async () => {
  let locals: Local[] = await api
    .get('/local')
    .then((e) => {
      return e.data
    })
    .catch((error) => alert('Erro ao acessar api: ' + error));
  console.log('locals fora', locals)
  return locals;
}

export const saveLocal = async (local: Local) => {
  return await api
    .post('/local', JSON.stringify(local), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(e => { return e.status })
    .catch(e => console.error(e))
}

export default api;