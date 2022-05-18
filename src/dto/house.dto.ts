import { ZoneDTO } from './zone.dto';
import { LocalDTO } from './local.dto';

export interface HouseDTO {
  id?: number,
  name?: string,
  local?: LocalDTO,
  zones?: ZoneDTO[]
}