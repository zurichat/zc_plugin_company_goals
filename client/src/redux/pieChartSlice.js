import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getPieChart = createAsyncThunk('pieChart/getNotifications', async () => {
  const response = await fetch('https://goals.zuri.chat/api/v1/goals/chart?org_id=61578237b9b9f30465f49ee8');
  if (response.ok) {
    const pieChartData = await response.json();
    return { pieChartData };
  }
});


export const pieChartSlice = createSlice({
  name: 'pieChartData',
  initialState: {
    pieChartData: null,
  },
  reducers: {
    addNotificationFromRTC: (state, { payload }) => {
      state.notifications.unshift(payload);
      return state;
    },
  },
  extraReducers: {
    [getPieChart.fulfilled]: (state, { payload }) => {
      const pieChartData = payload.pieChartData.data == null ? [] : payload.pieChartData.data;
      state.pieChartData = pieChartData;
      return state;
    },
  },
});

/* export const { addNotificationFromRTC } = notificationSlice.actions; */

export const selectPieChart = (state) => state.pieChart.pieChartData;

export default pieChartSlice.reducer;
