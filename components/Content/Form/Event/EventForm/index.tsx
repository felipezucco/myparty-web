import { DialogContent, DialogTitle, TextField } from "@material-ui/core";
import { Close } from "@mui/icons-material";
import { LocalizationProvider, DatePicker, LoadingButton, DateTimePicker, TimePicker } from "@mui/lab";
import { Dialog, DialogActions, FormControl, IconButton, InputLabel, MenuItem, Select } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DialogInterface } from "../../../../../src/interface/DialogInterface";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import ptBR from "date-fns/locale/pt-BR";
import { getHouses } from "../../../../../services/api.house";
import { HouseType } from "../../../../../models/LocalType";
import { format } from "date-fns";
import { persistEvent } from "../../../../../services/api.event";
import { AxiosError } from "axios";
import { GetEvent } from "../../../../../src/dto/event.dto";

interface Props extends DialogInterface { }

const EventForm: FC<Props> = ({ onClose, status, setStatus }) => {

  const { register, handleSubmit, setValue, getValues } = useForm<GetEvent>();
  const [dateValue, setDateValue] = useState<Date | null>(null);
  const [houses, setHouses] = useState<HouseType[]>([] as HouseType[])
  const [sending, setSending] = useState(false);

  // useEffect(() => {
  //   loadHouses();
  // }, [])

  async function handleSubmitForm() {
    setSending(true);
    if (dateValue) setValue('date', format(dateValue, 'dd/MM/yyyy HH:mm', { locale: ptBR }));
    // await persistEvent(getValues())
    //   .then(res => {
    //     setSending(false);
    //     // setStatus(false);
    //   })
    //   .finally(() => setSending(false))
  }

  // async function loadHouses() {
  //   await getHouses().then(res => setHouses(res.data));
  // }

  return (
    <Dialog open={status}>
      <form onSubmit={handleSubmit(handleSubmitForm)} method={'POST'}>
        <DialogTitle>
          Criar Evento
          {/* <IconButton onClick={() => setStatus(false)}>
            <Close />
          </IconButton> */}
        </DialogTitle>
        <DialogContent>
          <TextField variant="outlined"
            {...register('name')}
            label='Nome'
            required
          />
          {/* <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBR}>
            <DateTimePicker
              label="Data de realização"
              value={dateValue}
              onChange={(newValue) => setDateValue(newValue)}
              renderInput={(params) => <TextField variant="outlined" {...params} required />}
            />
          </LocalizationProvider> */}
          <FormControl fullWidth required margin='dense'>
            <InputLabel id="state-label-id">Selecione a casa de evento</InputLabel>
            <Select
              fullWidth
              labelId="state-label-id"
              label="Selecione a casa de evento"
              required
            // {...register('houseId')}
            >
              {houses.map(house => {
                return <MenuItem value={house.id} key={house.id}>{house.name}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <LoadingButton
            type="submit"
            loading={sending}
            variant={"contained"}
            disableElevation>
            Criar Evento
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default EventForm;