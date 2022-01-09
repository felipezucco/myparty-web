import { FunctionComponent } from "react";
import Navbar from "./Navbar";

interface LayoutComponentProps {

}

const LayoutComponent: FunctionComponent<LayoutComponentProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default LayoutComponent;