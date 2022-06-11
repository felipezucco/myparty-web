import { OrganizationDTO } from './organization.dto';
export interface LocalDTO {
  id?: number,
  aisle?: string,
  block?: string,
  city?: string,
  code?: string,
  number?: number,
  complement?: string,
  state?: string,
  organization?: OrganizationDTO
}