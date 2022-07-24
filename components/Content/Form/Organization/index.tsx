import { DialogContent, DialogTitle, TextField } from "@material-ui/core";
import { Close } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Autocomplete, Chip, Dialog, DialogActions, IconButton } from "@mui/material";
import { FC, useContext, useEffect, useLayoutEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { GetOrganizer, GetOrganizerWithOrganization, PersistOrganization, PersistOrganizer } from "../../../../src/dto/organization.dto";
import { AuthContext } from "../../../../contexts/AuthContext";
import { getUserByEmail } from "../../../../services/api.user";
import { persistOrganization } from "../../../../services/api.org";
import { RoleEnum } from "../../../../src/enum/RoleEnum";
import { useAppDispatch, useAppSelector } from "../../../../src/store/hooks";
import { asyncOrganizations, setStatus } from "../../../../src/store/user.store";
import { GetUser } from "../../../../src/dto/user.dto";

const OrganizationForm = () => {

  // Context
  const ctx = useContext(AuthContext);
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);
  // States
  const [userList, setUserList] = useState<GetUser[]>([] as GetUser[]);
  const [organizers, setOrganizers] = useState<GetUser[]>([ctx.user] as GetUser[]);
  // Hook-Form
  const { register, handleSubmit, setValue, getValues } = useForm<PersistOrganization>();

  /* Methods */

  async function handleSubmitForm() {
    if (ctx.user) {
      let user = ctx.user;
      let organizer: PersistOrganizer = { userId: user.id!, role: RoleEnum.ADMIN };
      let organizerList: PersistOrganizer[] = organizers.map(org => {
        if (org.id === user.id) return organizer;
        else return { role: RoleEnum.USER, userId: org.id! }
      });
      setValue('organizers', organizerList);

      persistOrganization(getValues()).then(res => {
        dispatch(setStatus(false));
        dispatch(asyncOrganizations(user.id!));
      }).catch((err: AxiosError) => console.error(err));
    }
  }

  async function getEmail(data: string) {
    await getUserByEmail(data).then(res => {
      setUserList(res.data);
    });
  }

  return (
    <Dialog open={user.show}>
      <form onSubmit={handleSubmit(handleSubmitForm)} method={'POST'}>
        <DialogTitle>
          Criar Organização
          <IconButton onClick={() => dispatch(setStatus(false))}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField variant="outlined"
            {...register('name')}
            label='Nome'
            margin={'normal'}
            required
          />
          <Autocomplete
            multiple
            options={userList}
            getOptionLabel={(option) => option.email ? option.email : 'empty'}
            loading={true}
            value={organizers}
            onChange={(event, value) => {
              setOrganizers([
                ctx.user,
                ...value.filter((option) => option !== ctx.user)
              ])
            }}
            renderTags={(tagValue, getTagProps) =>
              tagValue.map((option, index) => (
                <Chip
                  label={option.email}
                  {...getTagProps({ index })}
                  disabled={option === ctx.user}
                  key={index}
                />
              ))
            }
            filterSelectedOptions={true}
            renderInput={(params) => (
              <TextField
                {...params}
                onChange={(e) => getEmail(e.target.value)}
                margin={'normal'}
                variant={'outlined'}
                label="Organizadores"
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <LoadingButton
            type="submit"
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