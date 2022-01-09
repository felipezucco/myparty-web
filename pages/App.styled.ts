import styled from 'styled-components';

export const SideMenu = styled.div`
  width: 100px;
  height: 100%;
  padding: 3px;
  padding-right: 10px;
`

export const MenuItem = styled.div`
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

export const Header = styled.div`
  padding: 10px;
  font-size: 1.5em;
`