import { FC } from "react";
import { removePromotion } from "../../../../services/api.promotion";
import { GetPromotion } from "../../../../src/dto/promotion.dto";
import { asyncSetPromotions } from "../../../../src/store/event.store";
import { useAppDispatch, useAppSelector } from "../../../../src/store/hooks";
import RowComponent from "../../../row/row";

interface Props {
  promotion: GetPromotion
}

const PromotionRow: FC<Props> = ({ promotion }) => {

  // Context
  const dispatch = useAppDispatch();
  const controller = useAppSelector(state => state.controller);

  const promotionHandleRemove = () => {
    removePromotion(promotion.id).then(res => {
      alert("Promotion removed");
      dispatch(asyncSetPromotions(controller.selected_event.id));
    }).catch(err => {
      console.error(err);
    })
  }

  return (
    <RowComponent handleRemove={promotionHandleRemove}>
      {promotion.name}
    </RowComponent>
  )
}
export default PromotionRow;