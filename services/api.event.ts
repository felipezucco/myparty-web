import { AxiosResponse } from "axios";
import { EventDTO } from "./../models/EventType";
import api from "./api";

const ENDPOINT = "/api/event";

export async function persistEvent(data: EventDTO) {
  return await api.post(ENDPOINT, data);
}

export async function getEvents(): Promise<AxiosResponse<EventDTO[]>> {
  return await api.get(ENDPOINT);
}