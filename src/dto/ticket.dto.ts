import { GetEvent } from './event.dto';

export interface GetTicket {
  id?: number,
  name?: string,
  event?: GetEvent,
  batchs?: GetTicketBatch[]
}

export interface GetTicketBatch {
  id?: number,
  name?: string,
  quantity?: number,
  price?: number,
  firstNumber?: number
}

export interface PersistTicket {
  name: string,
  eventId: number,
  batchs?: PersistTicketBatch[]
}

export interface PersistTicketBatch {
  name: string,
  quantity: number,
  price: number,
  firstNumber: number,
  ticketId?: number
}