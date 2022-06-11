import Image from "next/image";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import style from './profile.module.scss';
import SettingsIcon from '@mui/icons-material/Settings';

const Profile = () => {

  const ctx = useContext(AuthContext);

  const SignOutComponent = () => {
    return (
      <div className={style[`exit`]} onClick={() => ctx.signOut()}>
        Sign Out
      </div>
    )
  }

  const AvatarComponent = () => {
    return (
      <div className={style["avatar"]}>
        <img src={"/cute-monkey-sitting-banana_138676-3305.webp"} />
      </div >
    )
  }

  const ProfileComponent = () => {
    return (
      <div className={style[`name`]}>
        <span>{ctx.user?.name}</span>
      </div >
    )
  }

  const SettingComponent = () => {
    return (
      <div className={style["settings"]}>
        <SettingsIcon fontSize={"large"} />
      </div >
    )
  }

  return (
    <div className={style[`profile-section`]}>
      <AvatarComponent />
      <ProfileComponent />
      <SignOutComponent />
      <SettingComponent />
    </div>
  )
}

export default Profile;