import { setHours } from "date-fns";
import { FC, useState } from "react";
import style from "./row.module.scss";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  handleRemove: () => void
}

const RowComponent: FC<Props> = ({ children, handleRemove }) => {

  // State
  const [hover, setHover] = useState(false);

  const getActionsStyle = () => "actions" + (hover ? "-show" : "-hide");

  return (
    <li className={style["row"]} onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)}>
      <div className={style["content"]}>
        {children}
      </div>
      <div className={style[getActionsStyle()]}>
        <span><MoreHorizIcon /></span>
        <span onClick={() => handleRemove()}><DeleteIcon /></span>
      </div>
    </li>
  )

}
export default RowComponent;