import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchOrgMission = createAsyncThunk('showMission/getMission', async () => {
  const response = await axios.get('https://goals.zuri.chat/api/v1/mission/6145d099285e4a184020742e');
  return response.data.data.mission;
});

export const updateOrgMission = createAsyncThunk('editMission/updateOrgMissionStatus', async (missionText) => {
  const response = await axios.put(
    'https://goals.zuri.chat/api/v1/mission/update/6145d099285e4a184020742e',
    { mission: missionText },
    {
      header: { 'Content-Type': 'application/json' },
    }
  );
  return response.data.payload;
});

export const editMissionSlice = createSlice({
  name: 'editMission',
  initialState: {
    showMissionModal: false,
    missionText: '',
  },
  reducers: {
    showEditMissionModal: (state) => {
      state.showMissionModal = !state.showMissionModal;
    },
    editMissionText: (state, action) => {
      state.missionText = action.payload;
    },
    updateOrgMissionFromRTC: (state, action) => {
      state.missionText = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrgMission.pending, (state) => {
      state.missionText = 'Loading';
    });
    builder.addCase(fetchOrgMission.fulfilled, (state, { payload }) => {
      state.missionText = payload;
    });
    builder.addCase(fetchOrgMission.rejected, (state) => {
      state.missionText = 'Failed to load mission';
    });
    builder.addCase(updateOrgMission.fulfilled, (state, { payload }) => {
      state.missionText = payload;
      state.showMissionModal = !state.showMissionModal;
    });
    builder.addCase(updateOrgMission.rejected, (state, action) => {
      alert(action.error.message);
    });
  },
});

export const { showEditMissionModal, editMissionText, updateOrgMissionFromRTC } = editMissionSlice.actions;

export default editMissionSlice.reducer;
