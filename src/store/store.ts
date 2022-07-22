import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user.store";
import organizationReducer from "./organization.store";
import eventReducer from "./event.store";
import controllerReducer from "./controller.store";

export const store = configureStore({
  reducer: {
    organization: organizationReducer,
    user: userReducer,
    event: eventReducer,
    controller: controllerReducer
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