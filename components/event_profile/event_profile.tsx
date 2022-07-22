import Link from "next/link"
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../src/store/hooks";
import Card from "../card/card";
import MenuItem from "../menu/item/menu_item";
import Menu from "../menu/menu";
import style from "./event_profile.module.scss";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import ArticleIcon from '@mui/icons-material/Article';
import ImageIcon from '@mui/icons-material/Image';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { EVENT_MENU, MenuTreeType } from "../default";
import { asyncSelectEvent } from "../../src/store/controller.store";
import { asyncSetEvents } from "../../src/store/organization.store";

const EventProfile = () => {

  // Context
  const controller = useAppSelector((state) => state.controller);
  const organization = useAppSelector((state) => state.organization);
  const dispatch = useAppDispatch();

  /* Methods */

  useEffect(() => {
    if (controller.selected_organization.id) {
      dispatch(asyncSetEvents(controller.selected_organization.id))
    }
  }, [controller.selected_organization.id])

  const SelectedEvent = () => {
    return (
      <select onChange={(e) => dispatch(asyncSelectEvent(Number.parseInt(e.currentTarget.value)))}
        value={controller.selected_event.id}>
        {organization.events.map(event => {
          return (
            <option key={event.id} value={event.id}>{event.name}</option>
          )
        })}
      </select>
    )
  }

  const MenuItens = () => {
    return (
      <Menu>
        {EVENT_MENU.map((d, idx) => {
          return <MenuItem menu={d} key={idx} />
        })}
      </Menu>
    )
  }

  const HeaderLeft = () => {
    return (
      <div className={style["event-select-component"]}>
        <SelectedEvent />
      </div>
    )
  }

  return (
    <Card header={<HeaderLeft />}>
      <MenuItens />
    </Card>
  )
}

export default EventProfile;