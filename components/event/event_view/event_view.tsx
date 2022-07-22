import { FC } from "react";
import { GetEvent } from "../../../src/dto/event.dto";
import { GetHouse } from "../../../src/dto/house.dto";
import ViewComponent from "../../view/view";
import EventRow from "./event_row/event_row";

interface Props {
  events: GetEvent[]
}

const EventView: FC<Props> = ({ events }) => {

  return (
    <ViewComponent>
      {events.map(event => {
        return <EventRow event={event} key={event.id} />
      })}
    </ViewComponent>
  )

}
export default EventView;