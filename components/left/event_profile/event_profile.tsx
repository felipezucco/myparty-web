import Link from "next/link"
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../src/store/hooks";
import { asyncSelectEvent, asyncSetEvents } from "../../../src/store/organization_ctx.store";
import Card from "../../card/card";
import MenuItem from "../../menu/item/menu_item";
import Menu from "../../menu/menu";
import style from "./event_profile.module.scss";
import { IoTicketOutline, RiDashboardFill } from 'react-icons/all';

const EventProfile = () => {

  //context
  const organization_ctx = useAppSelector((state) => state.organization_ctx);
  const dispatch = useAppDispatch();

  const data = [
    { id: 1, name: "Dashboard", link: "/event/dashboard", icon: <RiDashboardFill size={20} /> },
    { id: 2, name: "Actions", link: "/event/actions" },
    { id: 3, name: "Tickets", link: "/event/tickets", icon: <IoTicketOutline size={20} /> },
    { id: 4, name: "Financial", link: "/event/financial" },
    { id: 5, name: "Promotions", link: "/event/promotions" },
    { id: 6, name: "Documents", link: "/event/documents" },
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
        {data.map(d => {
          return <MenuItem name={d.name} key={d.id} href={d.link} icon={d.icon} />
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