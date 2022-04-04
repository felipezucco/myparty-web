import { Zone } from "./Zone.type"

export type LocalType = {
  id: number,
  city?: string,
  state?: string,
  block?: string,
  aisle?: string,
  code?: string,
  number?: number,
  complement?: string,
  coordenateX?: number,
  coordenateY?: number
}

export type HouseType = {
  id?: number,
  name?: string,
  local?: LocalType,
  zones?: Zone[]
}