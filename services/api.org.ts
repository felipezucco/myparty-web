import { UserDTO } from './../contexts/AuthContext';
import { AxiosResponse } from "axios";
import { OrganizationDTO, OrganizerDTO } from "../src/dto/organization.dto";
import api from "./api";

const LOCAL_API = "/api/org";

export async function persistOrganization(data: OrganizationDTO): Promise<AxiosResponse<String[]>> {
  return await api.post(LOCAL_API, data);
}

export async function getOrganizations(data: OrganizationDTO): Promise<AxiosResponse<String[]>> {
  return await api.post(LOCAL_API, data);
}

export async function getOrganizationById(payload: number): Promise<AxiosResponse<OrganizationDTO>> {
  return await api.get(LOCAL_API + `/${payload}`);
}

export async function getOrganizerByUser(data: UserDTO): Promise<AxiosResponse<OrganizerDTO[]>> {
  return await api.post(LOCAL_API + "/organizer/user", data);
}
