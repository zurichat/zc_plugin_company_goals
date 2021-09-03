import { createSlice } from '@reduxjs/toolkit';

export const editMissionSlice = createSlice({
  name: 'editMission',
  initialState: {
    showMission: false,
  },
  reducers: {
    showEditMissionModal: (state) => {
      state.showMission = !state.showMission;
    },
  },
});

export const { showEditMissionModal } = editMissionSlice.actions;

export default editMissionSlice.reducer;
