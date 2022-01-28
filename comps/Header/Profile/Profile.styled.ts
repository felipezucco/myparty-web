import styled from "styled-components";

export const ProfileWrapper = styled.section`
  display: grid;
  grid-template-areas: 'avatar name'
                       'avatar signout';
  grid-template-columns: max-content 1fr;
  align-items: center;
`

export const Avatar = styled.section`
  width: 30px;
  height: 30px;
  border-radius: 100%;
  grid-area: avatar;
`

export const Name = styled.section`
  grid-area: name;
  display: flex;
  justify-content: start;
  margin-left: 10px;
`

export const SignOut = styled.section`
  grid-area: signout;
  display: flex;
  justify-content: start;
  margin-left: 10px;
  align-items: center;
  font-size: .8em;
`