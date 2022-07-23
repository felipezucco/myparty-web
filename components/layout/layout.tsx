import react, { FC } from "react";
import Left from "./left/left";
import Main from "./main/main";
import Right from "./right/right";
import style from "./layout.module.css";
import { MenuTreeType } from "../default";

interface LayoutComponentProps {
  name: MenuTreeType
}

const LayoutComponent: FC<LayoutComponentProps> = ({ children, name }) => {
  return (
    <section className={style[`layout-template`]}>
      <Left />
      <Right />
      <Main menu={name} >
        {children}
      </Main>
    </section>
  );
}

export default LayoutComponent;
