import { PersistPromotion, GetPromotion } from './../src/dto/promotion.dto';
import { AxiosResponse } from 'axios';
import api from './api';

const ENDPOINT = "/api/promotion";

export const persistPromotion = async (promotion: PersistPromotion): Promise<AxiosResponse<void>> => {
  return await api.post(ENDPOINT, promotion);
}

export const removePromotion = async (promotionId: number): Promise<AxiosResponse<Boolean>> => {
  return await api.delete(ENDPOINT + `/${promotionId}`)
}

export const getPromotionByEventId = async (eventId: number): Promise<AxiosResponse<GetPromotion[]>> => {
  return await api.get(ENDPOINT + `/event/${eventId}`);
}