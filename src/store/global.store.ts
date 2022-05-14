import { AppThunk } from './store';
import { OrganizationDTO, OrganizerView } from '../dto/organization.dto';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getOrganizationById } from '../../services/api.org';

const global = createSlice({
  name: "global",
  initialState: {
    organization: { organizers: [] } as OrganizationDTO
  },
  reducers: {
    setOrganization(state, action: PayloadAction<OrganizationDTO>) {
      state.organization = action.payload;
    }
  }
});

export const { setOrganization } = global.actions;
export default global.reducer;

export function asyncSetOrganization(id: number): AppThunk {
  return async function (dispatch) {
    getOrganizationById(id).then(res => {
      dispatch(setOrganization(res.data));
    }).catch(err => console.error(err));
  }
}