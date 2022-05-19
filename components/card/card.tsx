import { CSSProperties, FC, ReactNode } from "react";
import style from "./card.module.css";

interface Props {
  header?: ReactNode;
  styles?: CSSProperties
}

const Card: FC<Props> = ({ children, header, styles }) => {

  const HeaderComponent = () => {
    if (header) {
      return (
        <div className={style["header"]}>
          {header}
        </div>
      )
    } else return <></>
  }

  return (
    <div className={style["card-component"]}>
      <HeaderComponent />
      <div className={style["content"]} style={styles}>
        {children}
      </div >
    </div>
  )
}
export default Card;