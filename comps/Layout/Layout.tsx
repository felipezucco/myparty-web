import { Card } from "primereact/card";
import { FunctionComponent } from "react";
import ContentComponent from "../Content/Content";
import FooterComponent from "../Footer/Footer";
import HeaderComponent from "../Header/Header";
import NavbarComponent from "../../components/Navbar/Navbar";
import { LayoutGrid, LayoutWrapper } from "./Layout.styled";

interface LayoutComponentProps { }

const LayoutComponent: FunctionComponent<LayoutComponentProps> = ({ children }) => {
  return (
    <LayoutWrapper>
      <LayoutGrid>
        <HeaderComponent />
        <NavbarComponent />
        <ContentComponent>
          {children}
        </ContentComponent>
        <FooterComponent />
      </LayoutGrid>
    </LayoutWrapper>
  );
}

export default LayoutComponent;