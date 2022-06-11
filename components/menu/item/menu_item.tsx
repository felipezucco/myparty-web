import Link from "next/link";
import { useRouter } from "next/router";
import { FC, ReactNode } from "react";
import style from "./menu_item.module.scss";

interface MenuItemInterface {
  name: string,
  href: string
  icon?: ReactNode
}

const MenuItem: FC<MenuItemInterface> = ({ name, href, icon }) => {
  const router = useRouter();
  const selectMenuItem = () => `menu-item-component${router.pathname === href ? '-selected' : ''}`
  // const selectMenuItem = () => `menu-item-component`;

  return (
    <Link href={href}>
      <li className={style[selectMenuItem()]}>
        {icon}
        <span>
          {name}
        </span>
      </li>
    </Link>
  )
}
export default MenuItem;