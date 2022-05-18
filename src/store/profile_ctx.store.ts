import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserDTO } from '../../contexts/AuthContext';
import { getOrganizerByUser } from '../../services/api.org';
import { OrganizerDTO } from '../dto/organization.dto';
import { AppThunk } from './store';

const profile_ctx = createSlice({
  name: "profile_ctx",
  initialState: {
    show: false,
    organizations: [] as OrganizerDTO[]
  },
  reducers: {
    setStatus(state, action: PayloadAction<boolean>) {
      state.show = action.payload;
    },

    setOrganizations(state, action: PayloadAction<OrganizerDTO[]>) {
      state.organizations = action.payload;
    }
  }
});

export const { setStatus, setOrganizations } = profile_ctx.actions;
export default profile_ctx.reducer;

export function asyncOrganizations(user: UserDTO): AppThunk {
  return async function (dispatch) {
    await getOrganizerByUser(user).then(res => {
      console.log(res);
      dispatch(setOrganizations(res.data));
    });
  }
}