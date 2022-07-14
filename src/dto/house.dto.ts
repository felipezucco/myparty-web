import { GetZone, PersistZone } from './zone.dto';
import { GetLocal } from './local.dto';

export interface GetHouse {
  id?: number,
  name?: string,
  local?: GetLocal,
  zones?: GetZone[]
}

export interface PersistHouse {
  name: string,
  localId: number,
  zones?: PersistZone[]
}