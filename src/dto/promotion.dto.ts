import { GetEvent } from './event.dto';

export type PersistPromotion = {
  name: string,
  description: string,
  startDate: string,
  endDate: string,
  eventId: number
}

export type GetPromotion = {
  id: number,
  name: string,
  description: string,
  startDate: string,
  endDate: string,
  event: GetEvent
}