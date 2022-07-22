import { FC } from "react";
import { useSelector } from "react-redux";
import { removeAction } from "../../../../services/api.action";
import { GetAction } from "../../../../src/dto/action.dto";
import { asyncSetActions } from "../../../../src/store/event.store";
import { useAppDispatch, useAppSelector } from "../../../../src/store/hooks";
import RowComponent from "../../../row/row";

interface Props {
  action: GetAction
}

const ActionRow: FC<Props> = ({ action }) => {

  // Context
  const dispatch = useAppDispatch();
  const controller = useAppSelector(state => state.controller);

  /* Methods */

  const actionHandleRemove = async () => {
    await removeAction(action.id)
      .then(res => {
        alert("Action removed");
        dispatch(asyncSetActions(controller.selected_event.id));
      })
      .catch(err => console.error(err));
  }

  return (
    <RowComponent key={action.id} handleRemove={actionHandleRemove}>
      <p>
        {action.name}
      </p>
    </RowComponent>
  )

}
export default ActionRow;