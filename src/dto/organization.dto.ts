import { UserDTO } from "../../contexts/AuthContext"

export interface OrganizationDTO {
  id?: number,
  name?: string,
  organizers?: OrganizerWithoutOrganizationDTO[],
}

export interface OrganizerDTO {
  id?: number,
  user?: UserDTO,
  role?: number,
  organization?: OrganizationDTO
}

export interface OrganizerWithoutOrganizationDTO {
  id?: number,
  user?: UserDTO,
  role?: number
}

export interface OrganizerView {
  id?: number,
  user?: number,
  role?: number,
  organization?: OrganizationDTO | null
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