import { HouseType } from './LocalType';
export type EventDTO = {
  id?: number,
  name: string,
  date: string,
  houseId: number
}

export type EventView = {
  id?: number,
  name: string,
  date: string,
  house: HouseType
}