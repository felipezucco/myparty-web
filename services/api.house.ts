import { AxiosResponse } from 'axios';
import { GetHouse } from './../src/dto/house.dto';
import qs from "qs";
import { HouseType } from "../models/LocalType";
import api from "./api";

const HOUSE_API = "/api/house";

export async function persistHouse(house: GetHouse) {
  return await api.post(HOUSE_API, house);
}

export async function getHouses(): Promise<AxiosResponse<GetHouse[]>> {
  return await api.get(HOUSE_API);
}

export async function getHouseById(ids: number[]) {
  return await api.get(HOUSE_API, {
    params: { id: ids },
    paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" })
  });
}

export async function deleteHouse(id: number) {
  return await api.delete(HOUSE_API + `/${id}`);
}

export async function getHousesByOrganizationId(id: number): Promise<AxiosResponse<GetHouse[]>> {
  return await api.get(HOUSE_API + `/org/${id}`);
}
