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
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getOrganizationById } from '../../services/api.org';
import { GetLocal } from '../dto/local.dto';
import { getLocals, getLocalsByOrganizationId } from '../../services/api.local';
import { getEventById, getEvents, getEventsByOrganizationId } from '../../services/api.event';
import { getHouses, getHousesByOrganizationId } from '../../services/api.house';
import Router from 'next/router';

interface Props {
  locals: GetLocal[],
  events: GetEvent[],
  houses: GetHouse[]
}

const organization = createSlice({
  name: "organization",
  initialState: {
    locals: [] as GetLocal[],
    houses: [] as GetHouse[],
    events: [] as GetEvent[]
  },
  reducers: {
    setLocals(state: Props, action: PayloadAction<GetLocal[]>) {
      state.locals = action.payload;
    },
    setEvents(state: Props, action: PayloadAction<GetEvent[]>) {
      state.events = action.payload;
    },
    setHouses(state: Props, action: PayloadAction<GetHouse[]>) {
      state.houses = action.payload;
    }
  }
});

export const { setLocals, setEvents, setHouses } = organization.actions;
export default organization.reducer;

export function asyncSetLocals(id: number): AppThunk {
  return async function (dispatch) {
    getLocalsByOrganizationId(id).then(res => {
      console.log("locals", res.data)
      dispatch(setLocals(res.data));
    }).catch(err => console.error(err));
  }
}

export function asyncSetHouses(id: number): AppThunk {
  return async function (dispatch) {
    getHousesByOrganizationId(id).then(res => {
      console.log("houses", res.data)
      dispatch(setHouses(res.data));
    }).catch(err => console.error(err));
  }
}

export function asyncSetEvents(id: number): AppThunk {
  return async function (dispatch) {
    getEventsByOrganizationId(id).then(res => {
      console.log("events", res.data)
      dispatch(setEvents(res.data));
    }).catch(err => console.error(err));
  }
}