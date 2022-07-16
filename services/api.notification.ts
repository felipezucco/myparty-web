import { AxiosResponse } from 'axios';
import { GetNotification } from '../components/lastest_news/last_news';
import { GetTicket } from '../src/dto/ticket.dto';
import api from './api';

const ENDPOINT = "/api/notification";

export const getNotificationsByUserId = async (userId: number): Promise<AxiosResponse<GetNotification[]>> => {
  return await api.get(ENDPOINT + `/${userId}`);
}

export const setNotificationSeen = async (notificationId: number): Promise<AxiosResponse<boolean>> => {
  return await api.put(ENDPOINT + `/seen/${notificationId}`);
}