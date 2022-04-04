export interface OrganizationDTO {
  id?: number,
  name: string,
  username: number,
  organizers: OrganizerDTO[]
}

export interface OrganizerDTO {
  id?: number,
  accountId: number,
  roleId: number,
  organizationId: number
}