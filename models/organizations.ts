export enum OrganizerRole {
  OWNER = 1,
  MANAGER = 2,
  USER = 3
}

export function getOrganizerRule(n: number) {
  switch (n) {
    case OrganizerRole.OWNER:
      return "Owner";
    case OrganizerRole.MANAGER:
      return "Manager";
    case OrganizerRole.USER:
      return "User";
    default:
      return "Corrigir";
  }
}