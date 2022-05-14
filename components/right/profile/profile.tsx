import Image from "next/image";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import Link from "next/link";
import style from './profile.module.css';
import SettingsIcon from '@mui/icons-material/Settings';

const Profile = () => {

  const ctx = useContext(AuthContext);

  const SignOutComponent = () => {
    return (
      <div className={style[`exit`]} onClick={() => ctx.signOut()}>
        Sair
      </div>
    )
  }

  const AvatarComponent = () => {
    return (
      <div className={style["avatar"]}>
        <Image src={"/cute-monkey-sitting-banana_138676-3305.webp"} width={50} height={50} />
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