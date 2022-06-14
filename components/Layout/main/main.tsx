import { FC, ReactNode, useEffect } from "react";
import { MenuTreeType } from "../../../pages/_default";
import MenuItem from "../../menu/item/menu_item";
import style from "./main.module.scss";

interface Props {
  menu?: MenuTreeType
}

const Main: FC<Props> = ({ children, menu }) => {

  useEffect(() => {
    console.log('menu', menu);
  }, [menu])

  return (
    <div className={style['main-section']} >
      <div className={style["main-section-header"]}>
        {menu?.icon}
        {menu?.name}
      </div>
      <ul className={style["main-section-menu"]}>
        {menu?.sub_menus?.map((m, idx) => {
          return <MenuItem key={idx} name={m.name} icon={m.icon} href={m.link} />
        })}
      </ul>
      <div className={style["main-section-content"]}>
        {children}
      </div>
    </div>
  )

}
export default Main;