import { FC } from "react";
import style from "./card.module.css";

interface Props { }

const Card: FC<Props> = ({ children }) => {

  return (
    <div className={style["card-component"]}>
      {children}
    </div>
  )
}
export default Card;