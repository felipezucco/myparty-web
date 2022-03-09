import Image from "next/image";
import { Avatar, Name, ProfileWrapper, SignOut } from "./Profile.styled";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import Link from "next/link";

const Profile = () => {

  const ctx = useContext(AuthContext);

  const SignOutButton = () => {
    return (
      <SignOut >
        <div onClick={() => ctx.signOut()}>
          Sair
        </div>
      </SignOut>
    )
  }

  const ProfileMenu = () => {
    return (
      <Name >
        {ctx.user?.username}
        <KeyboardArrowDownIcon />
      </Name>
    )
  }

  return (
    <ProfileWrapper>
      <Avatar>
        <Image src={"/favicon.ico"} width={100} height={100} />
      </Avatar>
      <ProfileMenu />
      <SignOutButton />

    </ProfileWrapper >
  )
}

export default Profile;