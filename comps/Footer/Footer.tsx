import { FunctionComponent } from "react";
import { Footer } from "./Footer.styled";

interface FooterProps {

}

const FooterComponent: FunctionComponent<FooterProps> = () => {
  return (
    <Footer>Copyright 2022</Footer>
  );
}

export default FooterComponent;