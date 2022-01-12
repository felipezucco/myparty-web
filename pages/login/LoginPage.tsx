import Router from "next/router";
import { Button } from "primereact/button";
import { FunctionComponent } from "react";
import { LoginPageWrapper } from "./LoginPage.styled";

interface LoginPageProps { }

const LoginPage: FunctionComponent<LoginPageProps> = () => {

  function redirect() {
    Router.push('/dashboard')
  }

  return (
    <LoginPageWrapper>
      <Button label='Logar' onClick={() => redirect()} />
    </LoginPageWrapper>
  );
}

export default LoginPage;