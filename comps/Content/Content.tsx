import { FunctionComponent } from "react";
import { Content } from "./Content.styled";

interface ContentComponentProps {

}

const ContentComponent: FunctionComponent<ContentComponentProps> = ({ children }) => {
  return (
    <Content>
      {children}
    </Content>
  );
}

export default ContentComponent;