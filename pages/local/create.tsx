import { ChangeEvent, FC, useEffect, useState } from 'react';
import { LocalType } from '../../models/LocalType';
import { getCEP, getCities, getFederativeUnit } from '../../services/DadosIBGE';
import Head from 'next/head';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import { useForm } from 'react-hook-form';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Alert, CircularProgress, TextField } from '@mui/material';
import { persistLocal } from '../../services/api.local';
import LoadingButton from '@mui/lab/LoadingButton';
import { AxiosError } from 'axios';
import { City, UF } from '../../models/UF.type';
import { Snackbar } from '@material-ui/core';

interface LabelValue {
  label: string,
  value: number
}

interface CreateLocalInterface {
  show: (b: boolean) => void;
  onClose: () => void;
}

const CreateLocal: FC<CreateLocalInterface> = ({ show, onClose }) => {

  const { register, handleSubmit } = useForm<LocalType>();
  const [UFList, setUFList] = useState<UF[]>([]);
  const [CitiesList, setCitiesList] = useState<City[]>([]);
  const [UFSelected, setUFSelected] = useState<UF>();
  const [CitySelected, setCitySelected] = useState<City>();
  const [showToastMessage, setShowToastMessage] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    getFederativeUnit().then(data => setUFList(data)).catch((err: AxiosError) => alert(err.message))
  }, [])

  useEffect(() => {
    if (UFSelected) {
      console.log(UFSelected)
      getCities(UFSelected.id).then(data => {

        console.log(data)
        setCitiesList(data)
      }
      );
    }
  }, [UFSelected])

  const handleSubmitForm = (data: LocalType) => {
    let newLocal: LocalType = { ...data, city: data.city.nome, state: data.state.sigla };
    console.log(newLocal)
    setSending(true);
    return persistLocal(newLocal)
      .then(() => {
        setShowToastMessage(true);
        setSending(false);
        setTimeout(() => {
          onClose();
          show(false);
        }, 3000);
      })
      .catch(err => console.error(err))
      .finally(() => setSending(false))
  }

  function ToastMessage() {
    return (
      <Snackbar open={showToastMessage} autoHideDuration={3000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="success" sx={{ width: '100%' }}>
          Local cadastrado com sucesso!
        </Alert>
      </Snackbar>
    )
  }

  return (
    <>
      <Head>
        <title>Tendel FC Web | Locais</title>
      </Head>
      <ToastMessage />
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <DialogTitle>
          {`Novo Local`}
        </DialogTitle>
        <DialogContent>
          <Grid container
            spacing={1}
            marginTop={1}>
            <Grid item xs={6}>
              <Select
                required
                fullWidth
                defaultValue={""}
                size="small"
                {...register('state')}
                onChange={(e) => setUFSelected(e.target.value)}>
                {UFList.map(uf => {
                  return <MenuItem value={uf} key={uf.id}>{uf.nome}</MenuItem>;
                })}
              </Select>
            </Grid>
            <Grid item xs={6}>
              <Select
                required
                fullWidth
                size="small"
                {...register('city')}
                onChange={(e: SelectChangeEvent<City>) => setCitySelected(e.target.value)}
                disabled={!!!UFSelected}>
                <MenuItem disabled={true} value={0}>{'Cidade'}</MenuItem>
                {CitiesList.map(city => {
                  return <MenuItem value={city} key={city.id}>{city.nome}</MenuItem>;
                })}
              </Select>
            </Grid>
            <Grid item xs={7}>
              <TextField
                label="Logradouro"
                {...register('aisle')}
                margin="normal"
                fullWidth
                required
                disabled={!!!UFSelected || !!!CitySelected}
                size="small"
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                label="Bairro"
                margin="normal"
                {...register('block')}
                fullWidth
                required
                disabled={!!!UFSelected || !!!CitySelected}
                size="small" />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="N°"
                {...register('number')}
                margin="normal"
                fullWidth
                required
                type={'number'}
                size="small"
                disabled={!!!UFSelected || !!!CitySelected} />
            </Grid>
            <Grid item xs={8}>
              <TextField
                label="Complemento"
                {...register('complement')}
                margin="normal"
                fullWidth
                type={'text'}
                size="small"
                disabled={!!!UFSelected || !!!CitySelected} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button type="button" onClick={() => show(false)}>Cancelar</Button>
          <LoadingButton
            type="submit"
            loading={sending}
            variant={"contained"}
            disableElevation>
            Salvar
          </LoadingButton>
        </DialogActions>
      </form>
    </>
  )
}

export default CreateLocal;