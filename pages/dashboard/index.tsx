import { FunctionComponent, ReactElement, ReactNode } from "react";
import LayoutComponent from "../../comps/Layout/Layout";
import { AppPropsWithLayout, NextPageWithLayout } from "../_app";

const About = () => {

  return (
    <div>Eu sou o dashboard</div>
  );
}

About.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutComponent>
      {page}
    </LayoutComponent>
  )
}

export default About;