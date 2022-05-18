import { useAppDispatch, useAppSelector } from "../../../src/store/hooks";
import OrganizationMembers from "./organization_members/organization_members";
import OrganizationMenu from "./organization_menu/organization_menu";
import style from "./organization_profile.module.css";

const OrganizationProfile = () => {
  const controller = useAppSelector((state) => state.organization_ctx);


  const HeaderComponent = () => {
    return (
      <div className={style["header"]}>
        <div className={style["avatar"]} />
        <div className={style["name"]} >
          {controller.organization.name}
        </div>
        <div className={style["role"]} >
          Owner
        </div>
      </div>
    )
  }

  return (
    <div className={style["organization_profile_component"]}>
      <HeaderComponent />
      <OrganizationMembers />
      <OrganizationMenu />
    </div>
  )
}

export default OrganizationProfile;