import { createSlice } from '@reduxjs/toolkit';

export const storeOrganizationRoomSlice = createSlice({
  name: 'storeOrganizationRoom',
  initialState: {
    roomId: null,
  },
  reducers: {
    storeRoomId: (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.roomId = payload;
    },
  },
});

export const { storeRoomId } = storeOrganizationRoomSlice.actions;

export default storeOrganizationRoomSlice.reducer;
