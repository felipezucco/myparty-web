import { FunctionComponent, ReactElement } from "react";
import LayoutComponent from "../../comps/Layout/Layout";

const DocumentsComponent = () => {
  return (
    <div>documents</div>
  );
}

DocumentsComponent.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutComponent>
      {page}
    </LayoutComponent>
  )
}

export default DocumentsComponent;