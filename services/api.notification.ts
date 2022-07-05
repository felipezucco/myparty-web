import { AxiosResponse } from 'axios';
import { NotificationType } from '../components/lastest_news/last_news';
import { TicketDTO } from '../src/dto/ticket.dto';
import api from './api';

const ENDPOINT = "/api/notification";

export const getNotificationsByUserId = async (userId: number): Promise<AxiosResponse<NotificationType[]>> => {
  return await api.get(ENDPOINT + `/${userId}`);
}