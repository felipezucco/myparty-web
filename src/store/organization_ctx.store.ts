import { getTicketsByEventId } from './../../services/api.ticket';
import { TicketDTO } from './../dto/ticket.dto';
import { HouseDTO } from './../dto/house.dto';
import { EventDTO } from './../dto/event.dto';
import { AppThunk } from './store';
import { OrganizationDTO, OrganizerView } from '../dto/organization.dto';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getOrganizationById } from '../../services/api.org';
import { LocalDTO } from '../dto/local.dto';
import { getLocals, getLocalsByOrganizationId } from '../../services/api.local';
import { getEventById, getEvents, getEventsByOrganizationId } from '../../services/api.event';
import { getHouses, getHousesByOrganizationId } from '../../services/api.house';
import Router from 'next/router';

interface Props {
  selected_organization: OrganizationDTO,
  selected_event: EventDTO,
  locals: LocalDTO[],
  events: EventDTO[],
  houses: HouseDTO[],
  tickets: TicketDTO[]
}

const organization_ctx = createSlice({
  name: "organization_ctx",
  initialState: {
    selected_organization: { organizers: [] } as OrganizationDTO,
    selected_event: {} as EventDTO,
    locals: [] as LocalDTO[],
    houses: [] as HouseDTO[],
    events: [] as EventDTO[],
    tickets: [] as TicketDTO[]
  },
  reducers: {
    selectOrganization(state: Props, action: PayloadAction<OrganizationDTO>) {
      state.selected_organization = action.payload;
    },
    selectEvent(state: Props, action: PayloadAction<EventDTO>) {
      state.selected_event = action.payload;
      Router.push("/event/dashboard");
    },
    setLocals(state: Props, action: PayloadAction<LocalDTO[]>) {
      state.locals = action.payload;
    },
    setEvents(state: Props, action: PayloadAction<EventDTO[]>) {
      state.events = action.payload;
    },
    setHouses(state: Props, action: PayloadAction<HouseDTO[]>) {
      state.houses = action.payload;
    },
    setTickets(state: Props, action: PayloadAction<TicketDTO[]>) {
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
      dispatch(setLocals(res.data));
    }).catch(err => console.error(err));
  }
}

export function asyncSetEvents(id: number): AppThunk {
  return async function (dispatch) {
    getEventsByOrganizationId(id).then(res => {
      dispatch(setEvents(res.data));
      dispatch(selectEvent(res.data?.slice(-1)[0]));
    }).catch(err => console.error(err));
  }
}

export function asyncSetHouses(id: number): AppThunk {
  return async function (dispatch) {
    getHousesByOrganizationId(id).then(res => {
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