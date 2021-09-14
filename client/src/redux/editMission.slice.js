import { createSlice } from '@reduxjs/toolkit';

export const editMissionSlice = createSlice({
  name: 'editMission',
  initialState: {
    showMission: false,
    missionText: 'Training A Million Youths Yearly'
  },
  reducers: {
    showEditMissionModal: (state) => {
      state.showMission = !state.showMission;
    },
    editMissionText: (state, action) => {
      state.missionText = action.payload
    }
  },
});

export const { showEditMissionModal, editMissionText } = editMissionSlice.actions;

export default editMissionSlice.reducer;
