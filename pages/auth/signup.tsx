import { AxiosError } from "axios";
import Router from "next/router";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "../../components/Auth.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Head from "next/head";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { LoadingButton } from "@mui/lab";
import { SignUpFormType, signUp } from "../../services/api.auth";

const SignUp = () => {

  const { register, handleSubmit, getValues } = useForm<SignUpFormType>();
  const [wrongPassword, setWrongPassword] = useState(false);
  const [sending, setSending] = useState(false);
  const toast = useRef<Toast>(null);

  const redirect = () => Router.push("/");

  function handleSignUp(data: SignUpFormType) {
    setSending(true);
    signUp(data)
      .then(() => {
        toast.current?.show({ severity: "success", summary: "Usuário criado com sucesso!", detail: "Você está sendo redirecionado.", life: 2000 });
        setTimeout(() => redirect(), 2000);
      })
      .catch((error: AxiosError) => toast.current?.show({ severity: "error", detail: error.response?.data.error, life: 2000 }))
      .finally(() => setSending(false));
  }

  function checkPassword(pass: string) {
    if (pass != getValues("password")) {
      setWrongPassword(true);
    } else {
      setWrongPassword(false);
    }
  }

  return (
    <section className={styles.login_page_wrapper}>
      <Head>
        <title>Event Web | Nova Conta</title>
      </Head>
      <Toast ref={toast} />
      <h1>Nova Conta</h1>
      <form className={styles.login_page_form}
        onSubmit={handleSubmit(handleSignUp)}>
        <TextField
          label={"Usuário"}
          type={"text"}
          {...register("username")}
          variant="outlined"
          size="small"
          required />
        <TextField
          label={"Senha"}
          type={"password"}
          {...register("password")}
          variant="outlined"
          size="small"
          error={wrongPassword}
          required />
        <TextField
          label={"Confirmar Senha"}
          type={"password"}
          onChange={(e) => checkPassword(e.target.value)}
          variant="outlined"
          size="small"
          error={wrongPassword}
          helperText={wrongPassword ? "Senhas não são compatíveis" : ""}
          required />
        <TextField
          label={"E-mail"}
          type={"email"}
          {...register("email")}
          variant="outlined"
          size="small"
          required />
        <TextField
          label={"Nome"}
          type={"text"}
          {...register("name")}
          variant="outlined"
          size="small"
          required />
        <LoadingButton
          loading={sending}
          type={"submit"}
          variant={"contained"}
          disableElevation>
          Criar
        </LoadingButton>
        <Button className={styles.back_button}
          type="button"
          startIcon={<ChevronLeftIcon />}
          onClick={() => Router.push("/")} >
          Voltar
        </Button>
      </form>
    </section>
  );
};

export default SignUp;