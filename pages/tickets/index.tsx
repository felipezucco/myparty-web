import { FunctionComponent, ReactElement } from "react";
import LayoutComponent from "../../comps/Layout/Layout";

const TicketComponent = () => {
  return (
    <div>ingressos</div>
  );
}

TicketComponent.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutComponent>
      {page}
    </LayoutComponent>
  )
}

export default TicketComponent;