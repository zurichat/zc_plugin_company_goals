/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const pageNumSlice = createSlice({
  name: 'pageNum',
  initialState: {
    pageNum: 1,
  },
  reducers: {
    goalPaginated(state, action) {
      state.pageNum = action.payload;
    },
  },
});
export const { goalPaginated } = pageNumSlice.actions;
export default pageNumSlice.reducer;
