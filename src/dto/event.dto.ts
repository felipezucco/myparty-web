import { GetOrganization } from './organization.dto';
import { GetHouse } from './house.dto';

export interface GetEvent {
  id: number,
  name: string,
  date: string,
  house: GetHouse,
  organization: GetOrganization
}

export interface PersistEvent {
  name: string,
  date: string,
  houseId: number,
  organizationId: number
}