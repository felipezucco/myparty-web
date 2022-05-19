import { FC } from "react";
import style from "./menu.module.css";

const Menu: FC = ({ children }) => {

  return (
    <ul className={style["menu-component"]}>
      {children}
    </ul>
  )
}
export default Menu;