import { FC } from "react";
import { LocalDTO } from "../../../src/dto/local.dto";
import styled from "./local_view.module.scss";

interface Props {
  local: LocalDTO
}

const LocalView: FC<Props> = ({ local }) => {

  return (
    <li className={styled["local-view-component"]} key={local.id}>
      <div>{local.aisle}</div>
      <div>{local.block}</div>
      <div>{local.city}</div>
    </li>
  )
}
export default LocalView;