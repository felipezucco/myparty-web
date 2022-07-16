import Link from "next/link"
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../src/store/hooks";
import { asyncSelectEvent, asyncSetEvents } from "../../src/store/organization_ctx.store";
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
import { MenuTreeType } from "../default";

const EventProfile = () => {

  //context
  const organization_ctx = useAppSelector((state) => state.organization_ctx);
  const dispatch = useAppDispatch();

  const data: MenuTreeType[] = [
    { name: "Dashboard", link: "/event/dashboard", icon: <DashboardIcon />, disable: true, visible: true },
    { name: "Actions", link: "/event/actions", icon: <PlayCircleOutlineIcon />, disable: true, visible: true },
    { name: "Tickets", link: "/event/tickets", icon: <ConfirmationNumberIcon />, disable: false, visible: true },
    { name: "Financial", link: "/event/financial", icon: <AttachMoneyIcon />, disable: true, visible: true },
    { name: "Promotions", link: "/event/promotions", icon: <LocalFireDepartmentIcon />, disable: true, visible: true },
    { name: "Documents", link: "/event/documents", icon: <ArticleIcon />, disable: true, visible: true },
    { name: "Visual", link: "/event/visual", icon: <ImageIcon />, disable: true, visible: true },
    { name: "Production", link: "/event/production", icon: <MusicNoteIcon />, disable: false, visible: true },
  ]

  useEffect(() => {
    if (organization_ctx.selected_organization.id) {
      dispatch(asyncSetEvents(organization_ctx.selected_organization.id))
    }
  }, [organization_ctx.selected_organization.id])

  const SelectedEvent = () => {
    return (
      <select onChange={(e) => dispatch(asyncSelectEvent(Number.parseInt(e.currentTarget.value)))}
        value={organization_ctx.selected_event?.id}>
        {organization_ctx.events.map(event => {
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
        {data.map((d, idx) => {
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