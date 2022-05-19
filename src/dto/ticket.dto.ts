import { EventDTO } from './event.dto';

export interface TicketDTO {
  id?: number,
  name?: string,
  event?: EventDTO,
  batchs?: TicketBatchDTO[]
}

export interface TicketBatchDTO {
  id?: number,
  name?: string,
  quantity?: number,
  price?: number,
  firstNumber?: number
}