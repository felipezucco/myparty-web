import { Grid, TextField, Typography } from "@mui/material";
import { FC } from "react";
import { UseFormRegister } from "react-hook-form";
import { HouseType } from "../../../../../../models/LocalType";

interface Props {
  register: UseFormRegister<HouseType>,
}

const NameForm: FC<Props> = ({ register }) => {

  return (
    <>
      <Typography variant="h5" marginTop={3} marginBottom={5}>Informe o nome da casa</Typography>
      <Grid item xs={12}>
        <TextField
          label={'Nome da casa'}
          margin="normal"
          {...register('name')}
          required
          helperText={'Informe o nome da casa de eventos'}
        />
      </Grid>
    </>
  )
}
export default NameForm;