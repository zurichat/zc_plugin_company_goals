// import axios from 'axios';

// const response = axios.get('https://goals.zuri.chat/api/v1/vision/org_id=61433d7ad0284bc6a92233bb');
// console.log(response.data);

/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchVision = createAsyncThunk('showVision/getVision', async () => {
  const response = await axios.get('http://localhost:4000/api/v1/vision/61433d7ad0284bc6a92233bb');
  return response.data;
});

export const getVisionSlice = createSlice({
  name: 'getVision',
  initialState: {
    visionText: '',
    status: null,
    errorMessage: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchVision.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchVision.fulfilled, (state, { payload }) => {
      state.status = 'success';
      state.visionText = payload.payload.vision;
    });
    builder.addCase(fetchVision.rejected, (state) => {
      state.errorMessage = 'Failed to fetch vision';
      state.status = 'failed';
    });
  },
});

export default getVisionSlice.reducer;
