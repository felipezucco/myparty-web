import { GetOrganizationWithOrganizers, GetOrganizer } from './../dto/organization.dto';
import { getTicketsByEventId } from './../../services/api.ticket';
import { GetTicket } from './../dto/ticket.dto';
import { GetHouse } from './../dto/house.dto';
import { GetEvent } from './../dto/event.dto';
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
  selected_organization: GetOrganizationWithOrganizers,
  selected_event: GetEvent,
  locals: GetLocal[],
  events: GetEvent[],
  houses: GetHouse[],
  tickets: GetTicket[]
}

const organization_ctx = createSlice({
  name: "organization_ctx",
  initialState: {
    selected_organization: { organizers: [] as GetOrganizer[] } as GetOrganizationWithOrganizers,
    selected_event: {} as GetEvent,
    locals: [] as GetLocal[],
    houses: [] as GetHouse[],
    events: [] as GetEvent[],
    tickets: [] as GetTicket[]
  },
  reducers: {
    selectOrganization(state: Props, action: PayloadAction<GetOrganizationWithOrganizers>) {
      state.selected_organization = action.payload;
    },
    selectEvent(state: Props, action: PayloadAction<GetEvent>) {
      state.selected_event = action.payload;
    },
    setLocals(state: Props, action: PayloadAction<GetLocal[]>) {
      state.locals = action.payload;
    },
    setEvents(state: Props, action: PayloadAction<GetEvent[]>) {
      state.events = action.payload;
    },
    setHouses(state: Props, action: PayloadAction<GetHouse[]>) {
      state.houses = action.payload;
    },
    setTickets(state: Props, action: PayloadAction<GetTicket[]>) {
      state.tickets = action.payload;
    }
  }
});

export const { selectOrganization, selectEvent, setLocals, setEvents, setHouses, setTickets } = organization_ctx.actions;
export default organization_ctx.reducer;

export function asyncSetOrganization(id: number): AppThunk {
  return async function (dispatch) {
    getOrganizationById(id).then(res => {
      dispatch(selectOrganization(res.data));
    }).catch(err => console.error(err));
  }
}

export function asyncSetLocals(id: number): AppThunk {
  return async function (dispatch) {
    getLocalsByOrganizationId(id).then(res => {
      console.log("locals", res.data)
      dispatch(setLocals(res.data));
    }).catch(err => console.error(err));
  }
}

export function asyncSetEvents(id: number): AppThunk {
  return async function (dispatch) {
    getEventsByOrganizationId(id).then(res => {
      console.log("events", res.data)
      dispatch(setEvents(res.data));
      dispatch(selectEvent(res.data?.slice(-1)[0]));
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

export function asyncSelectEvent(id: number): AppThunk {
  return async function (dispatch) {
    getEventById(id).then(res => {
      dispatch(selectEvent(res.data));
    }).catch(err => console.error(err));
  }
}

export function asyncSetTickets(id: number): AppThunk {
  return async function (dispatch) {
    getTicketsByEventId(id).then(res => {
      dispatch(setTickets(res.data));
    }).catch(err => console.error(err));
  }
}