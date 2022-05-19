import { AxiosResponse } from 'axios';
import { TicketDTO } from './../src/dto/ticket.dto';
import api from './api';

const ENDPOINT = "/api/ticket";

export const persistTicket = async (ticket: TicketDTO) => {
  return await api.post(ENDPOINT, ticket);
}

export const getTicketsByEventId = async (eventId: number): Promise<AxiosResponse<TicketDTO[]>> => {
  return await api.get(ENDPOINT + `/${eventId}`);
}

export const deleteTicketById = (ticketId: number): Promise<AxiosResponse> => {
  return api.delete(ENDPOINT + `/${ticketId}`);
}

export const deleteTicketBatchById = (ticketBatchId: number): Promise<AxiosResponse> => {
  return api.delete(ENDPOINT + `/batch/${ticketBatchId}`);
}