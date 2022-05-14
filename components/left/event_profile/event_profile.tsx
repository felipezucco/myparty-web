import Link from "next/link"

const EventProfile = () => {

  const SelectedEvent = () => {
    return (
      <select>
        {data.map(d => {
          return (
            <option key={d.id} value={d.id}>{d.name}</option>
          )
        })}
      </select>
    )
  }

  const MenuItens = () => {
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
    <div>
      <SelectedEvent />
      <MenuItens />
    </div>
  )
}

export default EventProfile;

const data = [
  { id: 1, name: "Dashboard", link: "/dashboard" },
  { id: 2, name: "Actions", link: "/actions" },
  { id: 1, name: "Tickets", link: "/tickets" },
  { id: 1, name: "Financial", link: "/financial" },
  { id: 1, name: "Promotions", link: "/promotions" },
  { id: 1, name: "Documents", link: "/documents" },
]