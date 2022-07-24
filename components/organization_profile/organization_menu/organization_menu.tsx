import MenuItem from "../../menu/item/menu_item"
import Menu from "../../menu/menu"
import DashboardIcon from '@mui/icons-material/Dashboard';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import HouseIcon from '@mui/icons-material/House';
import MapIcon from '@mui/icons-material/Map';
import { ORGANIZATION_MENU } from "../../default";

const OrganizationMenu = () => {

  const MenuItems = () => {

    return (
      <Menu>
        {ORGANIZATION_MENU.map((d, idx) => {
          if (d.visible) {
            return <MenuItem menu={d} key={idx} />
          }
        })}
      </Menu>
    )
  }

  return (
    <MenuItems />
  )
}
export default OrganizationMenu;