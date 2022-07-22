import { FC } from "react";
import { removeHouse } from "../../../../services/api.house";
import { GetHouse } from "../../../../src/dto/house.dto";
import RowComponent from "../../../row/row";
import style from "./house_row.module.scss";

interface Props {
  house: GetHouse
}

const HouseRow: FC<Props> = ({ house }) => {

  const getHouseSize = () => {
    return house.zones.reduce((pv, c) => pv + c.size, 0);
  }

  const houseHandleRemove = async () => {
    await removeHouse(house.id).then(res => alert("House " + house.name + " has been removed")).catch(err => console.error(err));
  }

  return (
    <RowComponent handleRemove={houseHandleRemove}>
      <div className={style["house-row"]}>
        <span className={style["title"]}>{house.name}</span>
        <span >{house.local.aisle}, {house.local.number}, {house.local.block} - {house.local.city}/{house.local.state}</span>
        <span >Zones: {house.zones.length}</span>
        <span >Size: {getHouseSize()} m²</span>
      </div>
    </RowComponent>
  )

}
export default HouseRow;