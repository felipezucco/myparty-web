import { useCallback, useEffect, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthContext";
import TextField from '@mui/material/TextField';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { AxiosError } from "axios";
import styles from '../../components/Auth.module.css'
import { Button } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import Router from 'next/router';

export type SignInRequestType = {
  username: string,
  password: string
}

const SignInPage = () => {

  // Context
  const { signIn } = useContext(AuthContext);
  // State
  const [loading, setLoading] = useState(false);
  const [wrongCredentials, setWrongCredentials] = useState(false);
  // Hook-Form
  const { register, handleSubmit } = useForm<SignInRequestType>();

  /* Methods */

  const handleSubmitForm = async (data: any) => {
    setLoading(true);
    setWrongCredentials(false)
    await signIn(data)
      .catch((err: AxiosError) => {
        setLoading(false)
        if (err.response?.status === 401) {
          setWrongCredentials(true)
        } else {
          alert(err.stack)
        }
      })
  }

  return (
    <section className={styles.login_page_wrapper}>
      <h1>Meu Evento Ideal</h1>
      <form className={styles.login_page_form}
        onSubmit={handleSubmit(handleSubmitForm)}>
        <TextField
          label={'Usuário'}
          type={'text'}
          {...register('username')}
          variant="filled"
          size="small"
          error={wrongCredentials}
          helperText={wrongCredentials ? 'Usuário e/ou senha inválidos' : ''}
          required />
        <TextField
          label={'Senha'}
          type={'password'}
          {...register('password')}
          variant="filled"
          size="small"
          error={wrongCredentials}
          required />
        <div className={styles.login_buttons_wrapper}>
          <Button className={styles.login_button}
            type={'button'}
            onClick={() => Router.push('/auth/signup')}>
            Criar conta
          </Button>
          <div className={`${styles.login_button} ${styles.auth_button} ${styles.forgotten_password}`}>
            <LoadingButton className={`${styles.login_button} ${styles.auth_button}`}
              type="submit"
              loading={loading}
              variant={"contained"}
              disableElevation
              startIcon={<LockOutlinedIcon />}>
              Autenticar
            </LoadingButton>
            <Button
              size={'small'}
              disabled>
              Esqueci minha senha
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
}

export default SignInPage;