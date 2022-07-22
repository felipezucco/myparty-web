import { FC } from "react";
import { GetAction } from "../../../src/dto/action.dto";
import ViewComponent from "../../view/view";
import ActionRow from "./action_row/action_row";

interface Props {
  actions: GetAction[]
}

const ActionView: FC<Props> = ({ actions }) => {

  return (
    <ViewComponent>
      {actions.map(action => {
        return <ActionRow action={action} key={action.id} />
      })}
    </ViewComponent>
  )

}
export default ActionView;