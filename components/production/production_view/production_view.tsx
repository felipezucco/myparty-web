import { FC } from "react";
import { GetProduction } from "../../../src/dto/production.dto";
import ViewComponent from "../../view/view"
import ProductionRow from "./production_row/production_row";

interface Props {
  productions: GetProduction[]
}

const ProductionView: FC<Props> = ({ productions }) => {

  return (
    <ViewComponent>
      {productions.map(production => {
        return <ProductionRow production={production} key={production.id} />
      })}
    </ViewComponent>
  )
}
export default ProductionView;