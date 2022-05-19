import { DialogContent, DialogTitle, TextField } from "@material-ui/core";
import { Close } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Autocomplete, Chip, Dialog, DialogActions, IconButton } from "@mui/material";
import { FC, useContext, useEffect, useLayoutEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { DialogInterface } from "../../../../src/interface/DialogInterface";
import { OrganizationDTO, OrganizerDTO } from "../../../../src/dto/organization.dto";
import { AuthContext, UserDTO } from "../../../../contexts/AuthContext";
import { getUserByEmail } from "../../../../services/api.user";
import { persistOrganization } from "../../../../services/api.org";
import { RoleEnum } from "../../../../src/enum/RoleEnum";
import { useSelector } from "react-redux";
import { RootState } from "../../../../src/store/store";
import { useAppDispatch, useAppSelector } from "../../../../src/store/hooks";
import { asyncOrganizations, setStatus } from "../../../../src/store/profile_ctx.store";

const OrganizationForm = () => {

  //context
  const ctx = useContext(AuthContext);
  const dispatch = useAppDispatch();
  const profile_ctx = useAppSelector((state) => state.profile_ctx);

  //states
  const [userList, setUserList] = useState<UserDTO[]>([])
  const [organizers, setOrganizers] = useState<UserDTO[]>([ctx.user] as UserDTO[]);

  //form-hook
  const { register, handleSubmit, setValue, getValues } = useForm<OrganizationDTO>();

  async function handleSubmitForm() {
    if (ctx.user) {
      let user = ctx.user;
      let organizer: OrganizerDTO = { user: { id: user.id }, role: RoleEnum.ADMIN };
      let organizerList: OrganizerDTO[] = organizers.map((org) => {
        if (org.id === user.id) return organizer;
        else return { role: RoleEnum.USER, user: { id: org.id } }
      });
      setValue('organizers', organizerList);

      console.log(getValues());

      persistOrganization(getValues()).then(res => {
        dispatch(setStatus(false));
        dispatch(asyncOrganizations(user));
      }).catch((err: AxiosError) => console.error(err));
    }
  }

  async function getEmail(data: string) {
    await getUserByEmail(data).then(res => {
      setUserList(res.data);
    });
  }

  return (
    <Dialog open={profile_ctx.show}>
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