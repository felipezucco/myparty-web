import { PersistOrganization } from './../src/dto/organization.dto';
import { AxiosResponse } from "axios";
import { GetOrganization, GetOrganizationWithOrganizers, GetOrganizerWithOrganization } from "../src/dto/organization.dto";
import api from "./api";

const ORGANIZATION_API = "/api/organization";

export async function persistOrganization(data: PersistOrganization): Promise<AxiosResponse<String[]>> {
  return await api.post(ORGANIZATION_API, data);
}

export async function getOrganizations(data: GetOrganization): Promise<AxiosResponse<String[]>> {
  return await api.post(ORGANIZATION_API, data);
}

export async function getOrganizationById(payload: number): Promise<AxiosResponse<GetOrganizationWithOrganizers>> {
  return await api.get(ORGANIZATION_API + `/${payload}`);
}

export async function getOrganizerByUser(userId: number): Promise<AxiosResponse<GetOrganizerWithOrganization[]>> {
  return await api.post(ORGANIZATION_API + `/user/${userId}`);
}
