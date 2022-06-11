import MenuItem from "../../menu/item/menu_item"
import Menu from "../../menu/menu"
import DashboardIcon from '@mui/icons-material/Dashboard';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import HouseIcon from '@mui/icons-material/House';
import MapIcon from '@mui/icons-material/Map';

const OrganizationMenu = () => {

  const MenuItems = () => {
    return (
      <Menu>
        {data.map(d => {
          return <MenuItem href={d.link} key={d.id} name={d.name} icon={d.icon!} />
        })}
      </Menu>
    )
  }

  return (
    <MenuItems />
  )
}
export default OrganizationMenu;

const data = [
  { id: 1, name: "Dashboard", link: "/organization/dashboard", icon: <DashboardIcon /> },
  { id: 2, name: "Events", link: "/organization/events", icon: <DateRangeIcon /> },
  { id: 3, name: "Financial", link: "/organization/financial", icon: <AttachMoneyIcon /> },
  { id: 4, name: "Houses", link: "/organization/houses", icon: <HouseIcon /> },
  { id: 5, name: "Locals", link: "/organization/locals", icon: <MapIcon /> },
]