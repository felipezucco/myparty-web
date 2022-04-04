import { DialogContent, DialogTitle, TextField } from "@material-ui/core";
import { Close } from "@mui/icons-material";
import { LocalizationProvider, DatePicker, LoadingButton, DateTimePicker, TimePicker } from "@mui/lab";
import { Dialog, DialogActions, FormControl, IconButton, InputLabel, MenuItem, Select } from "@mui/material";
import { FC, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import ptBR from "date-fns/locale/pt-BR";
import { format } from "date-fns";
import { AxiosError } from "axios";
import { DialogInterface } from "../../../../src/interface/DialogInterface";
import { OrganizationDTO } from "../../../../src/dto/OrganizationDTO";
import { AuthContext } from "../../../../contexts/AuthContext";

interface Props extends DialogInterface { }

const OrganizationForm: FC<Props> = ({ onClose, status, setStatus }) => {

  const { register, handleSubmit, setValue, getValues } = useForm<OrganizationDTO>();
  const [sending, setSending] = useState(false);
  const ctx = useContext(AuthContext);

  async function handleSubmitForm() {
    console.log('ctx', ctx.user?.username)
    console.log('asd', getValues());
  }

  return (
    <Dialog open={status}>
      <form onSubmit={handleSubmit(handleSubmitForm)} method={'POST'}>
        <DialogTitle>
          Criar Organização
          <IconButton onClick={() => setStatus(false)}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField variant="outlined"
            {...register('name')}
            label='Nome'
            required
          />
        </DialogContent>
        <DialogActions>
          <LoadingButton
            type="submit"
            loading={sending}
            variant={"contained"}
            disableElevation>
            Criar Organização
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default OrganizationForm;