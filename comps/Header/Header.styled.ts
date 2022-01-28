import styled from "styled-components";

export const Header = styled.header`
  width: 100%;
  grid-area: header;
  display: flex;
  align-items: center;
  column-gap: 20px;
  margin-bottom: 30px;
`

export const HeaderTitle = styled.span`
  font-size: 2em;
  flex-grow: 1;
  `

export const HeaderProfile = styled.section`
  width: 150px;
  height: 100%;
  flex-grow: 0;
`  