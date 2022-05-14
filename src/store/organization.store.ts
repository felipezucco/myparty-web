import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserDTO } from '../../contexts/AuthContext';
import { getOrganizerByUser } from '../../services/api.org';
import { OrganizerDTO } from '../dto/organization.dto';
import { AppThunk } from './store';

const organization = createSlice({
  name: "organization",
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

export const { setStatus, setOrganizations } = organization.actions;
export default organization.reducer;

export function asyncOrganizations(user: UserDTO): AppThunk {
  return async function (dispatch) {
    await getOrganizerByUser(user).then(res => {
      console.log(res);
      dispatch(setOrganizations(res.data));
    });
  }
}