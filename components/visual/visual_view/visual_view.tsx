import { FC } from "react";
import { GetVisual } from "../../../src/dto/visual.dto";
import ViewComponent from "../../view/view";
import VisualRow from "./visual_row/visual_row";

interface Props {
  visuals: GetVisual[]
}

const VisualView: FC<Props> = ({ visuals }) => {

  return (
    <ViewComponent>
      {visuals.map(visual => {
        return <VisualRow visual={visual} key={visual.id} />
      })}
    </ViewComponent>
  )
}
export default VisualView;