import { FC } from "react";
import { removeProduction } from "../../../../services/api.production";
import { GetProduction } from "../../../../src/dto/production.dto";
import { asyncSetProductions } from "../../../../src/store/event.store";
import { useAppDispatch, useAppSelector } from "../../../../src/store/hooks";
import RowComponent from "../../../row/row";

interface Props {
  production: GetProduction
}

const ProductionRow: FC<Props> = ({ production }) => {

  // Context
  const dispatch = useAppDispatch();
  const controller = useAppSelector(state => state.controller);

  const productionHandleRemove = () => {
    removeProduction(production.id).then(res => {
      alert("Production removed");
      dispatch(asyncSetProductions(controller.selected_event.id));
    }).catch(err => {
      console.error(err);
    })
  }

  return (
    <RowComponent key={production.id} handleRemove={productionHandleRemove}>
      {production.name}
    </RowComponent>
  )

}
export default ProductionRow;