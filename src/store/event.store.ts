import { getActionByEventId } from '../../services/api.action';
import { GetAction } from '../dto/action.dto';
import { getProductionByEventId } from '../../services/api.production';
import { GetProduction } from '../dto/production.dto';
import { getVisualByEventId } from '../../services/api.visual';
import { GetVisual } from '../dto/visual.dto';
import { getPromotionByEventId } from '../../services/api.promotion';
import { GetPromotion } from '../dto/promotion.dto';
import { getTicketsByEventId } from '../../services/api.ticket';
import { GetTicket } from '../dto/ticket.dto';
import { AppThunk } from './store';
import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Props {
  tickets: GetTicket[],
  promotions: GetPromotion[],
  visuals: GetVisual[],
  productions: GetProduction[],
  actions: GetAction[]
}


const event = createSlice({
  name: "event",
  initialState: {
    tickets: [] as GetTicket[],
    promotions: [] as GetPromotion[],
    visuals: [] as GetVisual[],
    productions: [] as GetProduction[],
    actions: [] as GetAction[]
  },
  reducers: {
    setTickets(state: Props, action: PayloadAction<GetTicket[]>) {
      state.tickets = action.payload;
    },
    setPromotions(state: Props, action: PayloadAction<GetPromotion[]>) {
      state.promotions = action.payload;
    },
    setProductions(state: Props, action: PayloadAction<GetProduction[]>) {
      state.productions = action.payload;
    },
    setVisuals(state: Props, action: PayloadAction<GetVisual[]>) {
      state.visuals = action.payload;
    },
    setActions(state: Props, action: PayloadAction<GetAction[]>) {
      state.actions = action.payload;
    }
  }, extraReducers(builder) {
    // builder.addDefaultCase((state, action) => {
    //   console.log("event", "state", state, "action", action);
    // });
    builder.addCase("controller/selectOrganization", (state, action) => {
      console.log("controller/selectOrganization", "state", state, "action", action);
    })
  },
});

export const { setTickets, setPromotions, setVisuals, setProductions, setActions } = event.actions;
export default event.reducer;

export function asyncSetTickets(id: number): AppThunk {
  return async function (dispatch) {
    getTicketsByEventId(id).then(res => {
      dispatch(setTickets(res.data));
    }).catch(err => console.error(err));
  }
}

export function asyncSetPromotions(id: number): AppThunk {
  return async function (dispatch) {
    getPromotionByEventId(id).then(res => {
      console.log("promotions", res.data)
      dispatch(setPromotions(res.data));
    }).catch(err => console.error(err));
  }
}

export function asyncSetVisuals(id: number): AppThunk {
  return async function (dispatch) {
    getVisualByEventId(id).then(res => {
      console.log("visual", res.data)
      dispatch(setVisuals(res.data));
    }).catch(err => console.error(err));
  }
}

export function asyncSetProductions(id: number): AppThunk {
  return async function (dispatch) {
    getProductionByEventId(id).then(res => {
      console.log("productions", res.data)
      dispatch(setProductions(res.data));
    }).catch(err => console.error(err));
  }
}

export function asyncSetActions(id: number): AppThunk {
  return async function (dispatch) {
    getActionByEventId(id).then(res => {
      console.log("actions", res.data)
      dispatch(setActions(res.data));
    }).catch(err => console.error(err));
  }
}