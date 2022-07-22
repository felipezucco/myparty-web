import DashboardIcon from '@mui/icons-material/Dashboard';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import HouseIcon from '@mui/icons-material/House';
import MapIcon from '@mui/icons-material/Map';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import ArticleIcon from '@mui/icons-material/Article';
import ImageIcon from '@mui/icons-material/Image';
import { ReactNode } from 'react';

export interface MenuTreeType {
  name: string,
  link: string,
  icon: ReactNode
  sub_menus?: MenuTreeType[],
  visible: boolean,
  disabled: boolean
}

export const ORGANIZATION_MENU: MenuTreeType[] = [
  { name: "Dashboard", link: "/organization/dashboard", icon: <DashboardIcon />, visible: true, disabled: true },
  {
    name: "Events", link: "/organization/events", icon: <DateRangeIcon />, visible: true, disabled: false, sub_menus: [
      { name: "New Event", link: "/organization/events/new", icon: <AddIcon />, visible: true, disabled: false }
    ]
  },
  { name: "Financial", link: "/organization/financial", icon: <AttachMoneyIcon />, visible: true, disabled: true },
  {
    name: "Houses", link: "/organization/houses", icon: <HouseIcon />, visible: true, sub_menus: [
      { name: "New House", link: "/organization/houses/new", icon: <AddIcon />, visible: true, disabled: false }
    ], disabled: false
  },
  {
    name: "Locals", link: "/organization/locals", icon: <MapIcon />, sub_menus: [
      { name: "New", link: "/organization/locals/new", icon: <AddIcon />, visible: true, disabled: false },
      { name: "Edit", link: "/organization/locals/new", icon: <EditIcon />, visible: true, disabled: true },
    ], visible: false, disabled: false
  },
]

export const EVENT_MENU: MenuTreeType[] = [
  { name: "Dashboard", link: "/event/dashboard", icon: <DashboardIcon />, disabled: true, visible: true },
  {
    name: "Actions", link: "/event/actions", icon: <PlayCircleOutlineIcon />, disabled: false, visible: true, sub_menus: [
      { name: "New", link: "/event/actions/new", icon: <AddIcon />, visible: true, disabled: false }]
  },
  { name: "Tickets", link: "/event/tickets", icon: <ConfirmationNumberIcon />, disabled: false, visible: true },
  { name: "Financial", link: "/event/financial", icon: <AttachMoneyIcon />, disabled: true, visible: true },
  {
    name: "Promotions", link: "/event/promotions", icon: <LocalFireDepartmentIcon />, disabled: false, visible: true, sub_menus: [
      { name: "New", link: "/event/promotions/new", icon: <AddIcon />, visible: true, disabled: false }]
  },
  { name: "Documents", link: "/event/documents", icon: <ArticleIcon />, disabled: true, visible: true },
  {
    name: "Visual", link: "/event/visual", icon: <ImageIcon />, disabled: false, visible: true, sub_menus: [
      { name: "New", link: "/event/visual/new", icon: <AddIcon />, visible: true, disabled: false }]
  },
  {
    name: "Production", link: "/event/production", icon: <MusicNoteIcon />, disabled: false, visible: true, sub_menus: [
      { name: "New", link: "/event/production/new", icon: <AddIcon />, visible: true, disabled: false }]
  }
]

export enum MenuEnum {
  ORGANIZATION_MENU, EVENT_MENU
}

const getMenu = (name: string, menu: MenuEnum = MenuEnum.ORGANIZATION_MENU): MenuTreeType => {
  switch (menu) {
    case MenuEnum.ORGANIZATION_MENU: {
      return ORGANIZATION_MENU.find(om => om.name === name) ?? {} as MenuTreeType;
    }
    case MenuEnum.EVENT_MENU: {
      return EVENT_MENU.find(om => om.name === name) ?? {} as MenuTreeType;
    }
    default: {
      return {} as MenuTreeType;
    }
  }
}
export default getMenu;