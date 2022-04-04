import { FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { AxiosError } from "axios";
import { FC, useEffect, useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { HouseType } from "../../../../../../models/LocalType";
import { UF, City } from "../../../../../../models/UF.type";
import { getFederativeUnit, getCities } from "../../../../../../services/DadosIBGE";

interface Props {
  register: UseFormRegister<HouseType>
}

const AddressForm: FC<Props> = ({ register }) => {

  const [UFList, setUFList] = useState<UF[]>([]);
  const [CitiesList, setCitiesList] = useState<City[]>([]);
  const [UFSelected, setUFSelected] = useState<number>();
  const [CitySelected, setCitySelected] = useState<number>();

  useEffect(() => {
    getFederativeUnit().then(data => setUFList(data)).catch((err: AxiosError) => alert(err.message))
  }, [])

  useEffect(() => {
    if (UFSelected)
      getCities(UFSelected).then(data => setCitiesList(data));
  }, [UFSelected])

  return (
    <>
      <Typography variant="h5" marginTop={3} marginBottom={5} >Informe o endereço</Typography>
      <Grid item xs={12}>
        <Grid container
          spacing={1}>
          <Grid item xs={6}>
            <FormControl fullWidth required margin='dense'>
              <InputLabel id="state-label-id">Estado</InputLabel>
              <Select
                fullWidth
                labelId="state-label-id"
                label="Estado"
                {...register('local.state')}
                onChange={(e) => setUFSelected(e.target.value as number)}>
                {UFList.map(uf => {
                  return <MenuItem value={uf.id} key={uf.id}>{uf.nome}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth required margin='dense'>
              <InputLabel id="city-label-id">Cidade</InputLabel>
              <Select
                fullWidth
                labelId="city-label-id"
                label="Cidade"
                {...register('local.city')}
                onChange={(e) => setCitySelected(e.target.value as number)}
                disabled={!!!UFSelected}>
                {CitiesList.map(city => {
                  return <MenuItem value={city.id} key={city.id}>{city.nome}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={7}>
            <FormControl fullWidth required >
              <TextField
                margin='dense'
                label="Logradouro"
                {...register('local.aisle')}
                fullWidth
                disabled={!!!UFSelected || !!!CitySelected}
              />
            </FormControl>
          </Grid>
          <Grid item xs={5}>
            <TextField
              label="Bairro"
              margin='dense'
              {...register('local.block')}
              fullWidth
              required
              disabled={!!!UFSelected || !!!CitySelected} />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="N°"
              {...register('local.number')}
              fullWidth
              required
              margin='dense'
              type={'number'}
              disabled={!!!UFSelected || !!!CitySelected} />
          </Grid>
          <Grid item xs={8}>
            <TextField
              label="Complemento"
              {...register('local.complement')}
              fullWidth
              margin='dense'
              type={'text'}
              disabled={!!!UFSelected || !!!CitySelected} />
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
export default AddressForm;