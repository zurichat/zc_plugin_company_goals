import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GetUserInfo } from "@zuri/control";

export const getNotifications = createAsyncThunk('notifications/getNotifications', async (orgId) => {
  const userInfo = await GetUserInfo();
  console.log(userInfo)
  const {_id:user_id} = userInfo;
  const response = await fetch(
    `https://goals.zuri.chat/api/v1/notifications?org_id=${orgId || "61578237b9b9f30465f49ee8"}&user_id=${user_id || "61578237b9b9f30465f49ee9"}`
  );
  if (response.ok) {
    const notifications = await response.json();
    return { notifications };
  }
});

export const markNotificationAsReadAsync = createAsyncThunk('notifications/markNotificationAsync', async ({ id }) => {
  const {_id:user_id,org_id} = await GetUserInfo(); 
  const response = await fetch(
    `https://goals.zuri.chat/api/v1/notifications?org_id=${org_id || "61578237b9b9f30465f49ee8"}&user_id=${user_id || "61578237b9b9f30465f49ee9"}&notification_id=${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (response.ok) {
    const notification = await response.json();
    console.log('ntoi', notification.data);
    return { id: notification.data._id, isRead: notification.data.isRead };
  }
});

export const markAllNotificationsAsReadAsync = createAsyncThunk(
  'notifications/markAllNotificationsAsReadAsync',
  async () => {
    const {_id:user_id,org_id} = await GetUserInfo(); 
    const response = await fetch(
      `https://goals.zuri.chat/api/v1/notifications/all?org_id=${org_id || "61578237b9b9f30465f49ee8"}&user_id=${user_id || "61578237b9b9f30465f49ee9"}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.ok) {
      const notification = await response.json();
      return { notification };
    }
  }
);

export const deleteNotificationAsync = createAsyncThunk(
  'notifications/markAllNotificationsAsReadAsync',
  async ({ id }) => {
    const {_id:user_id,org_id} = await GetUserInfo(); 
    const response = await fetch(
      `https://goals.zuri.chat/api/v1/notifications/?org_id=${org_id || "61578237b9b9f30465f49ee8"}&user_id=${user_id || "61578237b9b9f30465f49ee9"}&notification_id=${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.ok) {
      return { id: id };
    }
    return true;
  }
);

export const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    notifications: [],
  },
  reducers: {
    addNotificationFromRTC: (state, { payload }) => {
      state.notifications.unshift(payload);
      return state;
    },
  },
  extraReducers: {
    [getNotifications.fulfilled]: (state, { payload }) => {
      const notifications = payload.notifications.data == null ? [] : payload.notifications.data;
      state.notifications = notifications.reverse();
      return state;
    },
    [markNotificationAsReadAsync.fulfilled]: (state, { payload }) => {
      const index = state.notifications.findIndex((notification) => notification._id === payload.id);
      state.notifications[index].isRead = payload.isRead;
      return state;
    },
    [markAllNotificationsAsReadAsync.fulfilled]: (state, { payload }) => {
      state.notifications = payload.notifications.data;
      return state;
    },
    [deleteNotificationAsync.fulfilled]: (state, action) => {
      const { meta } = action;
      const updatedState = state.notifications.filter((notification) => notification._id !== meta.arg.id);
      state.notifications = updatedState;
      return state;
    },
  },
});

export const { addNotificationFromRTC } = notificationSlice.actions;

export const selectNotifications = (state) => state.notifications.notifications;

export default notificationSlice.reducer;