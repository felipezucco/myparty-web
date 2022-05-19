import { useAppSelector } from "../../../../src/store/hooks";
import style from "./organization_members.module.css";

const OrganizationMembers = () => {

  const global = useAppSelector((state) => state.organization_ctx);

  const OrganizationMembersList = () => {
    return (
      <ul className={style["list"]}>
        {global.selected_organization.organizers?.map(organizer => {
          return (
            <li key={organizer.id}>
              <span className={style["avatar"]} />
              <span className={style["name"]}>
                {organizer.user?.name}
              </span>
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <div className={style["organization_members_component"]}>
      <OrganizationMembersList />
    </div>
  )
}
export default OrganizationMembers;