import { AppThunk } from './store';
import { OrganizationDTO, OrganizerView } from '../dto/organization.dto';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getOrganizationById } from '../../services/api.org';
import { LocalDTO } from '../dto/local.dto';
import { getLocals, getLocalsByOrganizationId } from '../../services/api.local';

interface Props {
  organization: OrganizationDTO,
  locals: LocalDTO[]
}

const organization_ctx = createSlice({
  name: "organization_ctx",
  initialState: {
    organization: { organizers: [] } as OrganizationDTO,
    locals: [] as LocalDTO[]
  },
  reducers: {
    setOrganization(state: Props, action: PayloadAction<OrganizationDTO>) {
      state.organization = action.payload;
    },
    setLocals(state: Props, action: PayloadAction<LocalDTO[]>) {
      state.locals = action.payload;
    }
  }
});

export const { setOrganization, setLocals } = organization_ctx.actions;
export default organization_ctx.reducer;

export function asyncSetOrganization(id: number): AppThunk {
  return async function (dispatch) {
    getOrganizationById(id).then(res => {
      dispatch(setOrganization(res.data));
    }).catch(err => console.error(err));
  }
}

export function asyncSetLocals(id: number): AppThunk {
  return async function (dispatch) {
    getLocalsByOrganizationId(id).then(res => {
      dispatch(setLocals(res.data));
    }).catch(err => console.error(err));
  }
}