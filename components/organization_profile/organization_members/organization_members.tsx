import { useAppSelector } from "../../../src/store/hooks";
import style from "./organization_members.module.scss";
import AddIcon from '@mui/icons-material/Add';

const OrganizationMembers = () => {

  // context
  const global = useAppSelector((state) => state.organization_ctx);

  const OrganizationMembersList = () => {
    return (
      <div className={style["organization_members_component"]}>
        <div className={style["card-header-component"]}>
          <span className={style["title"]}>Members</span>
          <span className={style["icon"]} /*onClick={() => dispatch(setStatus(true))}*/>
            <AddIcon />
          </span>
        </div>
        <ul className={style["list"]}>
          {global.selected_organization.organizers?.map(organizer => {
            return (
              <li key={organizer.id}>
                <span className={style["avatar"]} >
                  <img src={"/cute-monkey-sitting-banana_138676-3305.webp"} />
                </span>
                <span className={style["name"]}>
                  {organizer.user?.name}
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  return (
    <OrganizationMembersList />
  )
}
export default OrganizationMembers;