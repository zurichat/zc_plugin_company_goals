/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const pageNumSlice = createSlice({
  name: 'pageNum',
  initialState: {
    pageNum: 1,
    tab: 'all',
  },
  reducers: {
    goalPaginated(state, action) {
      state.pageNum = action.payload;
    },
    goalTab(state, action) {
      state.tab = action.payload;
    },
  },
});
export const { goalPaginated, goalTab } = pageNumSlice.actions;
export default pageNumSlice.reducer;
