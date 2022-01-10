import styled from 'styled-components';

export const SideMenu = styled.nav`
  width: 100px;
  height: 100%;
  padding: 3px;
  padding-right: 10px;
  grid-area: nav;

  @media(max-width: 500px) {
    display: flex;
  }
`

export const MenuItem = styled.a`
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  justify-content: center;
  align-items: center;
  font-size: .6em;
  border-radius: 3px;

  :hover {
    background-color: #34256140;
    cursor: pointer;
    color: white;
  }
`