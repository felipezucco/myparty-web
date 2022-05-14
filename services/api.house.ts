import qs from "qs";
import { HouseType } from "../models/LocalType";
import api from "./api";

const HOUSE_API = "/api/house";

export async function persistHouse(house: HouseType) {
  return await api.post(HOUSE_API, house);
}

export async function getHouses() {
  return await api.get(HOUSE_API + "/all");
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
