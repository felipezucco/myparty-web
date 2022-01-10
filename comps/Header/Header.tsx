import { FunctionComponent } from "react";
import { Header, HeaderIcon, HeaderTitle } from "./Header.styled";
import Logo from '../../public/logo.svg'
import Image from "next/image";

interface HeaderComponentProps {

}

const HeaderComponent: FunctionComponent<HeaderComponentProps> = () => {
  return (
    <Header>
      {/* <Image src={'/logo.svg'} width={'50%'} height={'50%'} /> */}
      <Logo height={50} width={50} fill={'red'} stroke={'red'} />
      <HeaderTitle>Tendel FC Web</HeaderTitle>
    </Header>
  );
}

export default HeaderComponent;