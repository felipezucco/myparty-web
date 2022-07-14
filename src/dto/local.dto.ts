import { GetOrganization } from './organization.dto';

export interface GetLocal {
  id?: number,
  aisle?: string,
  block?: string,
  city?: string,
  code?: string,
  number?: number,
  complement?: string,
  state?: string,
  organization?: GetOrganization
}

export interface PersistLocal {
  aisle: string,
  block: string,
  city: string,
  code: string,
  number?: number,
  complement?: string,
  state: string,
  organizationId: number
}