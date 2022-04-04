import { RoleEnum } from './../enum/RoleEnum';
import { AccountType } from './AccountType';
export type OrganizationType = {
  id?: number,
  name: String,
  organizers: OrganizationType[]
}

export type OrganizerType = {
  id?: number,
  account: AccountType,
  role: RoleEnum,
  organizationId: number
}