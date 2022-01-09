import Link from "next/link";
import { FC, FunctionComponent } from "react";
import { MenuItem, SideMenu } from "../pages/App.styled";


const NavbarComponent: FC<any> = () => {
  return (
    <SideMenu>
      <Link href={'/'}>
        <MenuItem>
          <i className="pi pi-home" style={{ 'fontSize': '2em' }}></i>
          <span>Home</span>
        </MenuItem>
      </Link>
      <Link href={'/events'}>
        <MenuItem>
          <i className="pi pi-star" style={{ 'fontSize': '2em' }}></i>
          <span>Eventos</span>
        </MenuItem>
      </Link>
    </SideMenu>

  );
}

export default NavbarComponent;