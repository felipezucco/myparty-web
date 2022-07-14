import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotificationType } from '../../components/lastest_news/last_news';
import { UserDTO } from '../../contexts/AuthContext';
import { getOrganizerByUser } from '../../services/api.org';
import { GetOrganizerWithOrganization } from '../dto/organization.dto';
import { AppThunk } from './store';

interface Props {
  show: boolean,
  organizations: GetOrganizerWithOrganization[],
  notifications: NotificationType[]
}

const profile_ctx = createSlice({
  name: "profile_ctx",
  initialState: {
    show: false,
    organizations: [] as GetOrganizerWithOrganization[],
    notifications: [] as NotificationType[]
  },
  reducers: {
    setStatus(state: Props, action: PayloadAction<boolean>) {
      state.show = action.payload;
    },
    setOrganizations(state: Props, action: PayloadAction<GetOrganizerWithOrganization[]>) {
      state.organizations = action.payload;
    },
    setNotificationList(state: Props, action: PayloadAction<NotificationType[]>) {
      state.notifications = action.payload;
      state.notifications.sort((a, b) => b.id! - a.id!);
    },
    setNotification(state: Props, action: PayloadAction<NotificationType>) {
      state.notifications = [...state.notifications, action.payload];
      state.notifications.sort((a, b) => b.id! - a.id!);
    },
    updateNotification(state: Props, action: PayloadAction<NotificationType>) {
      state.notifications = state.notifications.map(n => n.id === action.payload.id ? action.payload : n);
    }
  },
  extraReducers: {
    'organization_ctx/selected_organization': () => console.log('toop')

  },
});

export const { setStatus, setOrganizations, setNotification, setNotificationList, updateNotification } = profile_ctx.actions;
export default profile_ctx.reducer;

export function asyncOrganizations(userId: number): AppThunk {
  return async function (dispatch) {
    await getOrganizerByUser(userId).then(res => {
      console.log(res);
      dispatch(setOrganizations(res.data));
    });
  }
}