import { OrganizationDTO } from './organization.dto';
import { HouseDTO } from './house.dto';
export interface EventDTO {
  id?: number,
  name?: string,
  date?: string,
  house?: HouseDTO,
  organization?: OrganizationDTO
}