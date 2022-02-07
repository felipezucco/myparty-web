import styled, { keyframes } from "styled-components";

const ShowIn = keyframes`
  0% {
    top: 0;
  } 100% {
    top: 25%;
  }
`

export const LoginPageWrapper = styled.section`
  position: relative;
  width: 350px;
  height: 500px;
  background-color: white;
  border-radius: 3px;
  box-shadow: 3px 3px 5px #00000050;  
  animation: ${ShowIn} 300ms ease-in-out forwards;
  display: flex;
  flex-direction: column;
  padding: 30px;  
`

export const LoginPageForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 10px;
`