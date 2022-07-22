import { FC } from "react";
import { removeEvent } from "../../../../services/api.event";
import { GetEvent } from "../../../../src/dto/event.dto";
import { useAppDispatch, useAppSelector } from "../../../../src/store/hooks";
import { asyncSetEvents } from "../../../../src/store/organization.store";
import RowComponent from "../../../row/row";

interface Props {
  event: GetEvent
}

const EventRow: FC<Props> = ({ event }) => {

  // Context
  const dispatch = useAppDispatch();
  const controller = useAppSelector(state => state.controller);

  /* Methods */

  const eventHandleRemove = async () => {
    await removeEvent(event.id).then(res => {
      alert("Event removed");
      dispatch(asyncSetEvents(controller.selected_event.id));
    }).catch(err => {
      console.error(err);
    })
  }

  return (
    <RowComponent key={event.id} handleRemove={eventHandleRemove}>
      {event.name}
    </RowComponent>
  )

}
export default EventRow;