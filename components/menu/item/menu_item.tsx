import Link from "next/link";
import { useRouter } from "next/router";
import { FC, ReactNode } from "react";
import { MenuTreeType } from "../../default";
import style from "./menu_item.module.scss";

interface Props {
  menu: MenuTreeType
}

const MenuItem: FC<Props> = ({ menu }) => {
  const router = useRouter();

  const disabled = () => menu.disabled ? "disabled" : "";
  const selectMenuItem = () => router.pathname === menu.link ? "-selected" : "";
  const getStyle = () => style["menu-item-component" + selectMenuItem()] + " " + style[disabled()];

  const HandledLink: FC = ({ children }) => {
    if (!menu.disabled) {
      return (
        <Link href={menu.link!}>
          {children}
        </Link>
      )
    } else {
      return (
        <>
          {children}
        </>
      )
    }
  }

  return (
    <HandledLink>
      <li className={getStyle()}>
        {menu.icon}
        <span>
          {menu.name}
        </span>
      </li>
    </HandledLink>
  )
}
export default MenuItem;