import { FC, useState } from "react";
import { useAppSelector } from "../../src/store/hooks";
import OrganizationMembers from "./organization_members/organization_members";
import OrganizationMenu from "./organization_menu/organization_menu";
import style from "./organization_profile.module.scss";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const OrganizationProfile: FC = () => {

  // context
  const controller = useAppSelector((state) => state.organization_ctx);

  // state
  const [hide, setHide] = useState(false);

  const HeaderComponent = () => {
    return (
      <div className={style["header"]}>
        <div className={style["avatar"]} >
          <img src="/cute-monkey-sitting-banana_138676-3305.webp" />
          <span className={style["hide"]} onClick={() => setHide(!hide)}>
            {hide ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </span>
        </div>
        <div className={style["name"]} >
          {controller.selected_organization.name}
        </div>
      </div>
    )
  }

  const ContentComponent = () => {

    const styles = () => hide ? style["content"] + " " + style["off"] : style["content"];
    // const styles = () => hide ? style["content"] : style["content-off"];

    return (
      <div className={styles()}>
        <OrganizationMembers />
        <OrganizationMenu />
      </div>
    )
  }

  return (
    <div className={style["organization_profile_component"]}>
      {/* <button onClick={() => setHide(!hide)}>{hide ? "Show" : "Hide"}</button> */}
      <HeaderComponent />
      <ContentComponent />
    </div>
  )
}

export default OrganizationProfile;