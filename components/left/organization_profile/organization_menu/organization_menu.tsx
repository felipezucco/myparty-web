import Link from "next/link"

const OrganizationMenu = () => {

  const MenuItems = () => {
    return (
      <>
        {data.map(d => {
          return (
            <Link href={d.link}>
              <li key={d.id}>
                {d.name}
              </li>
            </Link>
          )
        })}
      </>
    )
  }

  return (
    <ul>
      <MenuItems />
    </ul>
  )
}
export default OrganizationMenu;

const data = [
  { id: 1, name: "Dashboard", link: "/dashboard" },
  { id: 2, name: "Events", link: "/events" },
  { id: 3, name: "Financial", link: "/financial" },
  { id: 4, name: "Houses", link: "/houses" },
  { id: 5, name: "Locals", link: "/locals" },
]