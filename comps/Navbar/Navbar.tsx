import Link from "next/link";
import { FC, FunctionComponent } from "react";
import { MenuItem, SideMenu } from "./Navbar.styled";


const NavbarComponent: FC<any> = () => {
  return (
    <SideMenu>
      <Link href={'/'}>
        <MenuItem>
          <i className="pi pi-home" style={{ 'fontSize': '2em' }}></i>
          <span>Home</span>
        </MenuItem>
      </Link>
      <Link href={'/zones'}>
        <MenuItem>
          <i className="pi pi-th-large" style={{ 'fontSize': '2em' }}></i>
          <span>Ambientes</span>
        </MenuItem>
      </Link>
      <Link href={'/tickets'}>
        <MenuItem>
          <i className="pi pi-ticket" style={{ 'fontSize': '2em' }}></i>
          <span>Ingressos</span>
        </MenuItem>
      </Link>
      <Link href={'/tickets'}>
        <MenuItem>
          <i className="pi pi-dollar" style={{ 'fontSize': '2em' }}></i>
          <span>Financeiro</span>
        </MenuItem>
      </Link>
      <Link href={'/tickets'}>
        <MenuItem>
          <i className="pi pi-folder" style={{ 'fontSize': '2em' }}></i>
          <span>Documentos</span>
        </MenuItem>
      </Link>
      {/* <Link href={'/events'}>
        <MenuItem>
          <i className="pi pi-star" style={{ 'fontSize': '2em' }}></i>
          <span>Eventos</span>
        </MenuItem>
      </Link>
      <Link href={'/local'}>
        <MenuItem>
          <i className="pi pi-map-marker" style={{ 'fontSize': '2em' }}></i>
          <span>Locais</span>
        </MenuItem>
      </Link> */}
    </SideMenu>

  );
}

export default NavbarComponent;