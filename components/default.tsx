import DashboardIcon from '@mui/icons-material/Dashboard';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import HouseIcon from '@mui/icons-material/House';
import MapIcon from '@mui/icons-material/Map';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { ReactNode } from 'react';

export interface MenuTreeType {
  name: string,
  link: string,
  icon: ReactNode
  sub_menus?: MenuTreeType[]
}

export const ORGANIZATION_MENU: MenuTreeType[] = [
  { name: "Dashboard", link: "/organization/dashboard", icon: <DashboardIcon /> },
  { name: "Events", link: "/organization/events", icon: <DateRangeIcon /> },
  { name: "Financial", link: "/organization/financial", icon: <AttachMoneyIcon /> },
  { name: "Houses", link: "/organization/houses", icon: <HouseIcon /> },
  {
    name: "Locals", link: "/organization/locals", icon: <MapIcon />, sub_menus: [
      { name: "New", link: "/organization/locals/new", icon: <AddIcon /> },
      { name: "Edit", link: "/organization/locals/new", icon: <EditIcon /> },
    ]
  },
]

export const EVENT_MENU: MenuTreeType[] = [
  { name: "Production", link: "/event/production", icon: <MusicNoteIcon /> }
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