import { AxiosError } from "axios";
import Link from "next/link"
import { useEffect, useState } from "react";
import { getEvents } from "../../../services/api.event"
import { EventDTO } from "../../../src/dto/event.dto";

const EventProfile = () => {

  //states
  const [eventList, setEventList] = useState<EventDTO[]>([]);

  useEffect(() => {
    loadEvents();
  }, [])

  const loadEvents = async () => {
    await getEvents().then(res => {
      setEventList(res.data);
    }).catch((err: AxiosError) => {
      alert("Fail to load events.");
    })
  }

  const SelectedEvent = () => {
    return (
      <select>
        {eventList.map(d => {
          return (
            <option key={d.id} value={d.id}>{d.name}</option>
          )
        })}
      </select>
    )
  }

  const MenuItens = () => {
    return (
      <>
        {data.map(d => {
          return (
            <Link href={d.link}>
              <li key={d.id}>
                {d.name}
              </li>
            </Link>
          )
        })}
      </>
    )
  }

  return (
    <div>
      <SelectedEvent />
      <MenuItens />
    </div>
  )
}

export default EventProfile;

const data = [
  { id: 1, name: "Dashboard", link: "/dashboard" },
  { id: 2, name: "Actions", link: "/actions" },
  { id: 1, name: "Tickets", link: "/tickets" },
  { id: 1, name: "Financial", link: "/financial" },
  { id: 1, name: "Promotions", link: "/promotions" },
  { id: 1, name: "Documents", link: "/documents" },
]