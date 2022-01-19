import Link from "next/link";
import Router from "next/router";
import { Button } from "primereact/button";
import { FunctionComponent } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Zone } from "../../models/Zone.type";
import { LoginPageWrapper } from "./LoginPage.styled";

interface LoginPageProps { }

const LoginPage: FunctionComponent<LoginPageProps> = () => {

  const { register, handleSubmit } = useForm<{ username: string, password: string }>();

  function redirect() {
    Router.push('/dashboard')
  }

  function handleSubmitForm(data: any): SubmitHandler<any> {
    console.log(data)
    localStorage.setItem('felipe', 'tubarao');
    console.log(localStorage.getItem('felipe'))
    return data;
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