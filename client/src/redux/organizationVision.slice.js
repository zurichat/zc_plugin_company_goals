import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchOrgVision = createAsyncThunk('showVision/getVision', async (orgId) => {
  const response = await axios.get(`https://goals.zuri.chat/api/v1/vision/${orgId}`);
  return response.data;
});

export const updateOrgVision = createAsyncThunk('editVision/updateOrgVisionStatus', async ({ visionText, orgId }) => {
  console.log(visionText);
  /**
   * TODO:
   * Refactor to dynamically retrieve token on login.
   * As currently done, token would have to be manually edited everytime it expires.
   */
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb29raWUiOiJNVFl6TWpBMU56TXhPSHhIZDNkQlIwUlplRTVFVFRST1ZFVjZXa1JCZVU5RVVtbFplbHBvVDFSSmVVMTZWbXROWnowOWZEWGRoYXVMZ0Y1TWtOTFRiMkdEZ2ZHeFFKYWMwUjEydEVfSTJxTlZ4MnBQIiwiZW1haWwiOiJ1c2VyMUBnb2Fscy5jb20iLCJpZCI6IjYxNDM4NTEzZDAyODRiYzZhOTIyMzVkMiIsIm9wdGlvbnMiOnsiUGF0aCI6Ii8iLCJEb21haW4iOiIiLCJNYXhBZ2UiOjYzMDcyMDAwMDAsIlNlY3VyZSI6ZmFsc2UsIkh0dHBPbmx5IjpmYWxzZSwiU2FtZVNpdGUiOjB9LCJzZXNzaW9uX25hbWUiOiJmNjgyMmFmOTRlMjliYTExMmJlMzEwZDNhZjQ1ZDVjNyJ9.TQH0BokU7XhxnDEIxmmOTs9zvIhF18lhnHAagm-DtAY';
  const organizationId = '6145d099285e4a184020742e';

  const response = await axios({
    method: 'patch',
    url: `https://goals.zuri.chat/api/v1/vision/${orgId}`,
    data: { vision: visionText },
  });

  return response.data;
});

export const editVisionSlice = createSlice({
  name: 'editVision',
  initialState: {
    showVisionModal: false,
    visionText: '',
    status: null,
    errorMessage: '',
  },
  reducers: {
    showEditVisionModal: (state) => {
      state.showVisionModal = !state.showVisionModal;
    },
    updateOrgVisionFromRTC: (state, action) => {
      state.visionText = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrgVision.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchOrgVision.fulfilled, (state, { payload }) => {
      state.status = 'success';
      state.visionText = payload.payload.vision;
    });
    builder.addCase(fetchOrgVision.rejected, (state) => {
      state.visionText = 'Failed to fetch vision';
      state.status = 'failure';
    });
    builder.addCase(updateOrgVision.fulfilled, (state, { payload }) => {
      console.log('success-edit-vison', payload);

      state.visionText = payload.payload;
      state.showVisionModal = !state.showVisionModal;
      state.status = 'success';
      return state;
    });
    builder.addCase(updateOrgVision.rejected, (state, action) => {
      state.visionText = 'Failed to update vision';
      state.status = 'failure';
      return state;
    });
    builder.addCase(updateOrgVision.pending, (state, action) => {
      console.log('loading...', action);
      state.status = 'loading';
      return state;
    });
  },
});

export const { showEditVisionModal, updateOrgVisionFromRTC, extraReducers } = editVisionSlice.actions;

export default editVisionSlice.reducer;
