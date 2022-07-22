import { GetEvent } from './event.dto';
import { GetPromotion } from './promotion.dto';
import { GetVisual } from './visual.dto';
import { GetProduction } from './production.dto';
import { GetOrganizer } from './organization.dto';
export type PersistAction = {
  name: string,
  startDate: string,
  endDate: string,
  eventId: number,
  organizersId: number[],
  actionLink: PersistActionLink
}

export type PersistActionLink = {
  actionId?: number,
  productionId?: number,
  visualId?: number,
  promotionId?: number,
  ticketBraceletId?: number
}

export type GetAction = {
  id: number,
  name: string,
  startDate: string,
  endDate: string,
  event: GetEvent,
  organizers: GetOrganizer[],
  actionLink: GetActionLink
}

export type GetActionLink = {
  id: number,
  production: GetProduction,
  visual: GetVisual,
  promotion: GetPromotion
}