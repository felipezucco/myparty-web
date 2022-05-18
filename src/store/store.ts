import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import profile_ctxReducer from "./profile_ctx.store";
import organization_ctxReducer from "./organization_ctx.store";

export const store = configureStore({
  reducer: {
    organization_ctx: organization_ctxReducer,
    profile_ctx: profile_ctxReducer,
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;