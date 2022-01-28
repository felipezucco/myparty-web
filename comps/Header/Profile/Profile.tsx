import Image from "next/image";
import { Avatar, Name, ProfileWrapper, SignOut } from "./Profile.styled";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import Link from "next/link";

const Profile = () => {

  const ctx = useContext(AuthContext);

  const SignOutButton = () => {
    //ctx.signOut();
    return (
      <SignOut >
        <Link href={"/"}>
          <div onClick={() => ctx.signOut()}>
            Sair
          </div>
        </Link>
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