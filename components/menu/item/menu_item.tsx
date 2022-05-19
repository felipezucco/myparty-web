import Link from "next/link";
import { FC, ReactNode } from "react";
import style from "./menu_item.module.scss";

interface MenuItemInterface {
  name: string,
  href: string,
  icon: ReactNode
}

const MenuItem: FC<MenuItemInterface> = ({ name, href, icon }) => {

  return (
    <Link href={href}>
      <li className={style["menu-item-component"]}>
        {icon}
        <span>
          {name}
        </span>
      </li>
    </Link>
  )
}
export default MenuItem;