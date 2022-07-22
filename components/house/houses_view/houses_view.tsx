import { FC } from "react";
import { GetHouse } from "../../../src/dto/house.dto";
import HouseRow from "./house_row/house_row";
import style from "./houses_view.module.scss";
import ViewComponent from "../../view/view";

interface Props {
  houses: GetHouse[]
}

const HousesView: FC<Props> = ({ houses }) => {

  return (
    <ViewComponent>
      {houses.map(house => {
        return <HouseRow house={house} key={house.id} />
      })}
    </ViewComponent>
  )
}
export default HousesView;