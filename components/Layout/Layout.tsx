import { FunctionComponent } from "react";
import Left from "./left/left";
import Main from "./main/main";
import Right from "./right/right";
import style from "./layout.module.css";

interface LayoutComponentProps { }

const LayoutComponent: FunctionComponent<LayoutComponentProps> = ({ children }) => {
  return (
    <section className={style[`layout-template`]}>
      <Left />
      <Right />
      <Main >
        {children}
      </Main>
    </section>
  );
}

export default LayoutComponent;