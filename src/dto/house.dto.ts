import { GetZone, PersistZone } from './zone.dto';
import { GetLocal, PersistLocal } from './local.dto';

export interface GetHouse {
  id: number,
  name: string,
  local: GetLocal,
  zones: GetZone[]
}

export interface PersistHouse {
  name: string,
  local: PersistLocal,
  zones?: PersistZone[]
}