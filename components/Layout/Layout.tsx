import { FunctionComponent, ReactNode } from "react";
import Left from "./left/left";
import Main from "./main/main";
import Right from "./right/right";
import style from "./layout.module.css";
import { MenuTreeType } from "../default";

interface LayoutComponentProps {
  name: MenuTreeType
}

const LayoutComponent: FunctionComponent<LayoutComponentProps> = ({ children, name }) => {
  return (
    <section className={style[`layout-template`]}>
      <Left />
      <Right />
      <Main children={children} menu={name} />
    </section>
  );
}

export default LayoutComponent;