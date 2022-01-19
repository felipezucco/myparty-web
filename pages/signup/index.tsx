import Link from "next/link";
import Router from "next/router";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { FunctionComponent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { signUp, SignUpFormType } from "../../external/SignUp";

const LoginPage = () => {

  const { register, handleSubmit, getValues } = useForm<SignUpFormType>();
  const [wrongPassword, setWrongPassword] = useState(false);

  function redirect() {
    Router.push('/')
  }

  function handleSignUp(data: SignUpFormType) {
    signUp(data)
      .then((data) => console.log(data))
      .catch(error => alert(error))
  }

  function checkPassword(pass: string) {
    if (pass != getValues('password')) {
      setWrongPassword(true)
    } else setWrongPassword(false)
  }

  return (
    <Card>
      <form onSubmit={handleSubmit(handleSignUp)}>
        <input type={'text'} {...register('username')} placeholder="Usuário" required /><br />
        <input type={'password'} {...register('password')} placeholder="Senha" required /><br />
        <input type={'password'} required onChange={(e) => checkPassword(e.target.value)} placeholder="Confirmar senha" /><br />
        <p style={{ display: wrongPassword ? 'flex' : 'none', color: 'red' }}>Senhas não batem<br /></p>
        <input type={'email'} {...register('email')} placeholder="E-mail" required /><br />
        <input type={'text'} {...register('name')} placeholder="Nome" required /><br />
        <Button label='Criar' />
      </form>
    </Card>
  );
}

export default LoginPage;