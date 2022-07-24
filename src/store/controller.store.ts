import { GetOrganizationWithOrganizers, GetOrganizer } from '../dto/organization.dto';
import { GetEvent } from '../dto/event.dto';
import { AppThunk } from './store';
import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getOrganizationById } from '../../services/api.org';
import { getEventById } from '../../services/api.event';

interface Props {
  selected_organization: GetOrganizationWithOrganizers,
  selected_event: GetEvent
}


const setEventAction = createAction<GetEvent[]>("organization/setEvents");

const controller = createSlice({
  name: "controller",
  initialState: {
    selected_organization: { organizers: [] as GetOrganizer[] } as GetOrganizationWithOrganizers,
    selected_event: {} as GetEvent
  },
  reducers: {
    selectOrganization(state: Props, action: PayloadAction<GetOrganizationWithOrganizers>) {
      state.selected_organization = action.payload;
    },
    selectEvent(state: Props, action: PayloadAction<GetEvent>) {
      state.selected_event = action.payload;
    }
  }, extraReducers(builder) {
    builder.addCase(setEventAction, (state, action) => {
      if (action.payload.length > 0) {
        state.selected_event = action.payload[0];
      }
    })
  }
});

export const { selectOrganization, selectEvent } = controller.actions;
export default controller.reducer;

export function asyncSetOrganization(id: number): AppThunk {
  return async function (dispatch) {
    if (id) {
      getOrganizationById(id).then(res => {
        dispatch(selectOrganization(res.data));
      }).catch(err => console.error(err));
    }
  }
}

export function asyncSelectEvent(id: number): AppThunk {
  return async function (dispatch) {
    if (id) {
      getEventById(id).then(res => {
        dispatch(selectEvent(res.data));
      }).catch(err => console.error(err));
    }
  }
}