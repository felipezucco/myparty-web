import { InputText } from "primereact/inputtext";
import { FC, useState } from "react";
import { Zone } from "../../models/Zone.type";
import { SubmitHandler, useForm } from "react-hook-form";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

interface CreateZoneInterface {
  show: (b: boolean) => void
}

const CreateZoneComponent: FC<CreateZoneInterface> = ({ show }) => {

  const { register, handleSubmit } = useForm<Zone>();
  const [success, setSuccess] = useState(false);

  const handleSubmitForm = (data: any): SubmitHandler<Zone> => {
    console.log(data);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
    return data;
  }

  return (
    <>
      <Snackbar
        open={success}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert
          severity="success"
          action={
            <IconButton color="inherit" size="small" onClick={() => setSuccess(false)}>
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }>
          Novo ambiente criado com sucesso!
        </Alert>
      </Snackbar>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <DialogTitle>
          {`Novo Ambiente`}
        </DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item xs={12}>
              <TextField
                label="Nome do Ambiente"
                id="outlined-size-small"
                {...register('name')}
                fullWidth
                margin="normal"
                size="small" />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Metragem"
                id="outlined-size-small"
                {...register('metric')}
                margin="normal"
                size="small" />
            </Grid>
            <Grid item xs={6}>
              <input type={'color'} {...register('color')} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button type="button" onClick={() => show(false)}>Cancelar</Button>
          <Button type="submit" /*onClick={() => show(false)}*/ autoFocus>Criar Novo Ambiente</Button>
        </DialogActions>
      </form>
    </>
  );
}

export default CreateZoneComponent;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { 'eventweb.token': token } = parseCookies(context);

  if (token) return { props: {} }
  else return {
    redirect: {
      destination: '/auth/invalid_auth',
      permanent: false
    }
  }
}