import { FC } from "react";
import { GetHouse } from "../../../src/dto/house.dto";
import HouseRow from "./house_row/house_row";
import style from "./houses_view.module.scss";

interface Props {
  houses: GetHouse[]
}

const HousesView: FC<Props> = ({ houses }) => {

  return (
    <ul className={style["houses-view"]}>
      {houses.map(house => {
        return <HouseRow house={house} key={house.id} />
      })}
    </ul>
  )
}
export default HousesView;