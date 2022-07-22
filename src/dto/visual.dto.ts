import { GetEvent } from './event.dto';
import { PersistFinancial, GetFinancial } from './financial.dto';

export type PersistVisual = {
  name: string,
  description: string,
  type: string,
  channel: string,
  releaseDate: string,
  financial: PersistFinancial,
  eventId: number
}

export type GetVisual = {
  id: number,
  name: string,
  description: string,
  type: string,
  channel: string,
  releaseDate: string,
  financial: GetFinancial,
  event: GetEvent
}