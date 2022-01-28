import { AxiosError } from "axios";
import Router from "next/router";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { signUp, SignUpFormType } from "../../services/SignUp";

const LoginPage = () => {

  const { register, handleSubmit, getValues } = useForm<SignUpFormType>();
  const [wrongPassword, setWrongPassword] = useState(false);
  const [sending, setSending] = useState(false);
  const toast = useRef<Toast>(null);

  const redirect = () => Router.push('/');

  function handleSignUp(data: SignUpFormType) {
    setSending(true);
    signUp(data)
      .then(() => {
        toast.current?.show({ severity: 'success', summary: 'Usuário criado com sucesso!', detail: 'Você está sendo redirecionado.', life: 2000 });
        setTimeout(() => redirect(), 2000);
      })
      .catch((error: AxiosError) => toast.current?.show({ severity: 'error', detail: error.response?.data.error, life: 2000 }))
      .finally(() => setSending(false))
  }

  function checkPassword(pass: string) {
    if (pass != getValues('password')) {
      setWrongPassword(true)
    } else setWrongPassword(false)
  }

  return (
    <Card>
      <Toast ref={toast} />
      <form onSubmit={handleSubmit(handleSignUp)}>
        <input type={'text'} {...register('username')} placeholder="Usuário" required /><br />
        <input type={'password'} {...register('password')} placeholder="Senha" required /><br />
        <input type={'password'} required onChange={(e) => checkPassword(e.target.value)} placeholder="Confirmar senha" /><br />
        <p style={{ display: wrongPassword ? 'flex' : 'none', color: 'red' }}>Senhas não batem<br /></p>
        <input type={'email'} {...register('email')} placeholder="E-mail" required /><br />
        <input type={'text'} {...register('name')} placeholder="Nome" required /><br />
        <Button label='Criar' loading={sending} />
      </form>
      <Button icon="pi pi-angle-left" label="Voltar" className="p-button-rounded p-button-text" onClick={() => Router.push("/")} />
    </Card>
  );
}

export default LoginPage;