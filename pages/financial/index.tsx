import { FunctionComponent, ReactElement } from "react";
import LayoutComponent from "../../comps/Layout/Layout";

const FinancialComponent = () => {
  return (
    <div>financeiro</div>
  );
}

FinancialComponent.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutComponent>
      {page}
    </LayoutComponent>
  )
}

export default FinancialComponent;