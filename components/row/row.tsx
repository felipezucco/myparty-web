import { setHours } from "date-fns";
import { FC, useState } from "react";
import style from "./row.module.scss";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const Row: FC = ({ children }) => {

  // State
  const [hover, setHover] = useState(false);

  const getActionsStyle = () => "actions" + (hover ? "-show" : "-hide");

  return (
    <li className={style["row"]} onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)}>
      <div className={style["content"]}>
        {children}
      </div>
      <div className={style[getActionsStyle()]}>
        <MoreHorizIcon />
      </div>
    </li>
  )

}
export default Row;