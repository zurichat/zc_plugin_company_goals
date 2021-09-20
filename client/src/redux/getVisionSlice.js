// import axios from 'axios';

// const response = axios.get('https://goals.zuri.chat/api/v1/vision/org_id=61433d7ad0284bc6a92233bb');
// console.log(response.data);

/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getVision = createAsyncThunk('showVision/getVision', async () => {
    return fetch('https://goals.zuri.chat/api/v1/vision/61433d7ad0284bc6a92233bb').then(
        (res) => res.json()
        // console.log(res.json(), "response")
    );
})

export const getVisionSlice = createSlice({
    name: 'getVision',
    initialState: {
        vision: getVision,
        status: null,
        errorMessage: null
    },
    extraReducers: {
        [getVision.pending]: (state, action) => {
            state.status = 'loading';
        },
        [getVision.fulfilled]: (state, { payload }) => {
            state.list = payload;
            state.status = 'success';
        },
        [getVision.rejected]: (state, { error }) => {
            state.errorMessage = error.message;
            state.status = 'failed';
        },
    },
});

export default getVisionSlice.reducer;
