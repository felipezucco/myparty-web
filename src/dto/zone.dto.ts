export interface GetZone {
  id?: number,
  name?: string,
  size?: number
}

export interface PersistZone {
  name: string,
  size: number,
  localId?: number
}