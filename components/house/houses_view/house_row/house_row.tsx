import { FC } from "react";
import { GetHouse } from "../../../../src/dto/house.dto";
import Row from "../../../row/row";
import style from "./house_row.module.scss";

interface Props {
  house: GetHouse
}

const HouseRow: FC<Props> = ({ house }) => {

  const getHouseSize = () => {
    return house.zones.reduce((pv, c) => pv + c.size, 0);
  }

  return (
    <Row>
      <div className={style["house-row"]}>
        <span className={style["title"]}>{house.name}</span>
        <span >{house.local.aisle}, {house.local.number}, {house.local.block} - {house.local.city}/{house.local.state}</span>
        <span >Zones: {house.zones.length}</span>
        <span >Size: {getHouseSize()} m²</span>
      </div>
    </Row>
  )

}
export default HouseRow;