import { Button, FormControl, FormHelperText, Grid, Input, InputLabel, List, TextField, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { UseFieldArrayReturn, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import ZoneCard from '../../../../Card/House/Zones/ZoneCard';
import { Zone } from '../../../../../../models/Zone.type';
import uniqid from 'uniqid';
import { HouseType } from '../../../../../../models/LocalType';

interface Props {
  setValues: UseFormSetValue<HouseType>
}

var PROVISORY_ID = 1;
const ZonesForm: FC<Props> = ({ setValues }) => {

  const [zones, setZones] = useState<Zone[]>([] as Zone[])
  const [zoneBuffer, setZoneBuffer] = useState<Zone>();

  useEffect(() => {
    setValues('zones', zones);
  }, [zones])

  const handleCreateZone = () => {
    const newZone: Zone = { ...zoneBuffer, id: PROVISORY_ID }
    setZones([...zones, newZone]);
    setZoneBuffer({ size: 0, name: '' });
    PROVISORY_ID++;
  }

  const removeZone = (id: number | undefined) => {
    setZones(zones.filter((zone) => zone.id !== id));
  }

  return (
    <>
      <Typography variant='h5' marginTop={3} marginBottom={5}>Informe os ambientes</Typography>
      <Grid container xs={12}>
        <Grid item xs={5}>
          <TextField
            fullWidth
            value={zoneBuffer?.name}
            label={'Nome'}
            onChange={(e) => setZoneBuffer({ ...zoneBuffer, name: e.target.value })}
          />
        </Grid>
        <Grid item xs={3}>
          <FormControl variant='filled'>
            <InputLabel htmlFor="my-input">Tamanho</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text"
              type='number' value={zoneBuffer?.size as number}
              onChange={(e) => setZoneBuffer({ ...zoneBuffer, size: parseInt(e.target.value) })} />
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <Button variant='outlined' disableElevation
            onClick={() => handleCreateZone()}>Criar Ambiente</Button>
        </Grid>
      </Grid>
      <List
        sx={{
          overflow: 'auto',
          maxHeight: '100%',
        }}>
        {zones.map((zone) => {
          return <ZoneCard zone={zone} key={zone.id} removeZone={removeZone} />
        })}
      </List>
    </>
  )
}
export default ZonesForm;