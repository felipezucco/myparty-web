import { FC } from "react";
import { GetPromotion } from "../../../src/dto/promotion.dto";
import ViewComponent from "../../view/view";
import PromotionRow from "./promotion_row/promotion_row";

interface Props {
  promotions: GetPromotion[]
}

const PromotionView: FC<Props> = ({ promotions }) => {

  return (
    <ViewComponent>
      {promotions.map(promotion => {
        return <PromotionRow promotion={promotion} key={promotion.id} />
      })}
    </ViewComponent>
  )
}
export default PromotionView;