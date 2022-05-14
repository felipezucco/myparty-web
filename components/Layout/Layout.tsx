import { Card } from "primereact/card";
import { FunctionComponent } from "react";
import Content from "../Content/Content";
import FooterComponent from "../Footer/Footer";
import Profile from "../right/profile/profile";
import Left from "../left/left";
import Main from "../main/main";
import Organization from "../right/organizations/organization";
import Right from "../right/right";
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