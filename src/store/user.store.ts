import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetNotification } from '../../components/lastest_news/last_news';
import { getOrganizerByUser } from '../../services/api.org';
import { GetOrganizerWithOrganization } from '../dto/organization.dto';
import { AppThunk } from './store';

interface Props {
  show: boolean,
  organizations: GetOrganizerWithOrganization[],
  notifications: GetNotification[]
}

const user = createSlice({
  name: "user",
  initialState: {
    show: false,
    organizations: [] as GetOrganizerWithOrganization[],
    notifications: [] as GetNotification[]
  },
  reducers: {
    setStatus(state: Props, action: PayloadAction<boolean>) {
      state.show = action.payload;
    },
    setOrganizations(state: Props, action: PayloadAction<GetOrganizerWithOrganization[]>) {
      state.organizations = action.payload;
    },
    setNotificationList(state: Props, action: PayloadAction<GetNotification[]>) {
      state.notifications = action.payload;
      state.notifications.sort((a, b) => b.id! - a.id!);
    },
    setNotification(state: Props, action: PayloadAction<GetNotification>) {
      state.notifications = [...state.notifications, action.payload];
      state.notifications.sort((a, b) => b.id! - a.id!);
    },
    updateNotification(state: Props, action: PayloadAction<GetNotification>) {
      state.notifications = state.notifications.map(n => n.id === action.payload.id ? action.payload : n);
    }
  }
});

export const { setStatus, setOrganizations, setNotification, setNotificationList, updateNotification } = user.actions;
export default user.reducer;

export function asyncOrganizations(userId: number): AppThunk {
  return async function (dispatch) {
    await getOrganizerByUser(userId).then(res => {
      console.log("getOrganizerByUser", res);
      dispatch(setOrganizations(res.data));
    });
  }
}