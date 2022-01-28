import { getAPIClient } from './axios';
import { Local } from '../models/Local.type';

export const apiInstance = getAPIClient();

export const getLocals = async () => {
  let locals: Local[] = await apiInstance
    .get('/local')
    .then((e) => {
      return e.data
    })
    .catch((error) => alert('Erro ao acessar api: ' + error));
  console.log('locals fora', locals)
  return locals;
}

export const saveLocal = async (local: Local) => {
  return await apiInstance
    .post('/local', JSON.stringify(local), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(e => { return e.status })
    .catch(e => console.error(e))
}

export default apiInstance;