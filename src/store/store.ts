import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import organizationReducer from "./organization.store";
import globalReducer from "./global.store";

export const store = configureStore({
  reducer: {
    global: globalReducer,
    organization: organizationReducer,
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