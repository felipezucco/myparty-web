import { AxiosResponse } from "axios";
import { EventDTO } from "../src/dto/event.dto";
import api from "./api";

const ENDPOINT = "/api/event";

export async function persistEvent(data: EventDTO) {
  return await api.post(ENDPOINT, data);
}

export async function getEvents(): Promise<AxiosResponse<EventDTO[]>> {
  return await api.get(ENDPOINT);
}

export async function getEventsByOrganizationId(id: number): Promise<AxiosResponse<EventDTO[]>> {
  return await api.get(ENDPOINT + `/org/${id}`);
}

export async function getEventById(id: number): Promise<AxiosResponse<EventDTO>> {
  return await api.get(ENDPOINT + `/${id}`);
}
