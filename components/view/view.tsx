import { FC } from "react";
import style from "./view.module.scss";

const ViewComponent: FC = ({ children }) => {

  return (
    <ul className={style["view"]}>
      {children}
    </ul>
  )

}
export default ViewComponent;