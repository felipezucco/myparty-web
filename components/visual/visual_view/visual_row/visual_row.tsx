import { vi } from "date-fns/locale";
import { FC } from "react";
import { removeVisual } from "../../../../services/api.visual";
import { GetVisual } from "../../../../src/dto/visual.dto";
import { asyncSetVisuals } from "../../../../src/store/event.store";
import { useAppDispatch, useAppSelector } from "../../../../src/store/hooks";
import RowComponent from "../../../row/row";

interface Props {
  visual: GetVisual
}

const VisualRow: FC<Props> = ({ visual }) => {

  // Context
  const dispatch = useAppDispatch();
  const controller = useAppSelector(state => state.controller);

  /* Methods */

  const visualHandleRemove = () => {
    removeVisual(visual.id).then(res => {
      alert("Visual removed");
      dispatch(asyncSetVisuals(controller.selected_event.id));
    }).catch(err => {
      console.error(err);
    })
  }

  return (
    <RowComponent handleRemove={visualHandleRemove}>
      {visual.name}
    </RowComponent>
  )
}
export default VisualRow;