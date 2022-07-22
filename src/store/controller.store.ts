import { getActionByEventId } from '../../services/api.action';
import { GetAction } from '../dto/action.dto';
import { getProductionByEventId } from '../../services/api.production';
import { GetProduction } from '../dto/production.dto';
import { getVisualByEventId } from '../../services/api.visual';
import { GetVisual } from '../dto/visual.dto';
import { getPromotionByEventId } from '../../services/api.promotion';
import { GetPromotion } from '../dto/promotion.dto';
import { GetOrganizationWithOrganizers, GetOrganizer } from '../dto/organization.dto';
import { getTicketsByEventId } from '../../services/api.ticket';
import { GetTicket } from '../dto/ticket.dto';
import { GetHouse } from '../dto/house.dto';
import { GetEvent } from '../dto/event.dto';
import { AppThunk } from './store';
import { GetOrganization } from '../dto/organization.dto';
import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getOrganizationById } from '../../services/api.org';
import { GetLocal } from '../dto/local.dto';
import { getLocals, getLocalsByOrganizationId } from '../../services/api.local';
import { getEventById, getEvents, getEventsByOrganizationId } from '../../services/api.event';
import { getHouses, getHousesByOrganizationId } from '../../services/api.house';
import Router from 'next/router';

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
      console.log("controller", "action", action.payload);
    })
  }
});

export const { selectOrganization, selectEvent } = controller.actions;
export default controller.reducer;

export function asyncSetOrganization(id: number): AppThunk {
  return async function (dispatch) {
    getOrganizationById(id).then(res => {
      dispatch(selectOrganization(res.data));
    }).catch(err => console.error(err));
  }
}

export function asyncSelectEvent(id: number): AppThunk {
  return async function (dispatch) {
    getEventById(id).then(res => {
      dispatch(selectEvent(res.data));
    }).catch(err => console.error(err));
  }
}