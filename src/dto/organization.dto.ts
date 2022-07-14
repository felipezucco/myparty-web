import { GetUser } from './user.dto';


export type GetOrganization = {
  id: number,
  name: string
}

export type GetOrganizationWithOrganizers = GetOrganization & {
  organizers: GetOrganizer[],
}

export interface GetOrganizer {
  id?: number,
  user?: GetUser,
  role?: number
}

export type GetOrganizerWithOrganization = GetOrganizer & {
  organization?: GetOrganizationWithOrganizers
}

export type PersistOrganization = {
  name: string,
  organizers: PersistOrganizer[]
}

export type PersistOrganizer = {
  userId: number,
  role: number,
  organizationId?: number
}

export interface UserOrganizations {
  id: number,
  user: string,
  role: number,
  organization: {
    id: number,
    name: string,
    organizers: {
      id: number,
      name: string
    }[]
  }[]
}