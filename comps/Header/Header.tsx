import { Header, HeaderProfile, HeaderTitle } from "./Header.styled";
import Profile from "./Profile/Profile";

const HeaderComponent = () => {

  return (
    <Header>
      {/* <Image src={'/logo.svg'} width={'50%'} height={'50%'} /> */}
      {/* <Logo height={50} width={50} fill={'red'} stroke={'red'} /> */}
      <HeaderTitle>Event Web</HeaderTitle>
      <HeaderProfile>
        <Profile />
      </HeaderProfile>
    </Header>
  );
}

export default HeaderComponent;