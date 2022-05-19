import Link from "next/link"
import MenuItem from "../../../menu/item/menu_item"
import Menu from "../../../menu/menu"

const OrganizationMenu = () => {

  const MenuItems = () => {
    return (
      <Menu>
        {data.map(d => {
          return <MenuItem href={d.link} key={d.id} name={d.name} />
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
  { id: 1, name: "Dashboard", link: "/organization/dashboard" },
  { id: 2, name: "Events", link: "/organization/events" },
  { id: 3, name: "Financial", link: "/organization/financial" },
  { id: 4, name: "Houses", link: "/organization/houses" },
  { id: 5, name: "Locals", link: "/organization/locals" },
]