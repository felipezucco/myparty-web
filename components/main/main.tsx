import { FC } from "react";
import Card from "../card/card";
import style from "./main.module.css";

interface Props { }

const Main: FC<Props> = ({ children }) => {

  return (
    <Card >
      <div className={style['main-section']} >
        {children}
      </div>
    </Card>
  )

}
export default Main;