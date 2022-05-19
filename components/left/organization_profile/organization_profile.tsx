import { FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../src/store/hooks";
import OrganizationMembers from "./organization_members/organization_members";
import OrganizationMenu from "./organization_menu/organization_menu";
import style from "./organization_profile.module.css";

const OrganizationProfile: FC = () => {

  // state
  const controller = useAppSelector((state) => state.organization_ctx);
  const [hide, setHide] = useState(false);

  const HeaderComponent = () => {
    return (
      <div className={style["header"]}>
        <div className={style["avatar"]} />
        <div className={style["name"]} >
          {controller.selected_organization.name}
        </div>
        <div className={style["role"]} >
          Owner
        </div>
      </div>
    )
  }

  const ContentComponent = () => {
    if (!hide) {
      return (
        <>
          <OrganizationMembers />
          <OrganizationMenu />
        </>
      )
    } else return <></>
  }

  return (
    <div className={style["organization_profile_component"]}>
      <button onClick={() => setHide(!hide)}>{hide ? "Show" : "Hide"}</button>
      <HeaderComponent />
      <ContentComponent />
    </div>
  )
}

export default OrganizationProfile;