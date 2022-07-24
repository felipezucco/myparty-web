import { NotificationEvent } from "../enum/notification_event.enum";

export interface GetNotification {
  id: number,
  message: string,
  type: string,
  organization: string,
  date: string,
  visualized: boolean,
  user: string,
  attributes: [],
  instructions: NotificationEvent[]
}