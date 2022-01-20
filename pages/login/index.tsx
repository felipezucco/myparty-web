import Link from "next/link";
import Router from "next/router";
import { Button } from "primereact/button";
import { FunctionComponent, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthContext";
import { LoginPageWrapper } from "./LoginPage.styled";
import { parseCookies, } from 'nookies';

export type SignInRequestType = {
  username: string,
  password: string
}

interface LoginPageProps { }

const LoginPage: FunctionComponent<LoginPageProps> = () => {

  const { register, handleSubmit } = useForm<SignInRequestType>();
  const { signIn } = useContext(AuthContext);

  function redirect() {
    Router.push('/dashboard')
  }

  function handleSubmitForm(data: any) {
    signIn(data)
  }

  return (
    <LoginPageWrapper>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <input type={'text'} {...register('username')} /><br />
        <input type={'password'} {...register('password')} />
        <Button label='Logar' />
      </form>
      <Link href={"/signup"} >Criar nova conta</Link>
    </LoginPageWrapper>
  );
}

export default LoginPage;