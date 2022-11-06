import { createSlice } from '@reduxjs/toolkit';

export const isOpenCartOverlaySlice = createSlice({
  name: 'isOpenCartOverlay',
  initialState: {
    isOpenCartOverlay: false,
  },

  reducers: {
    switchCartOverlay: (state, action) => {
      state.isOpenCartOverlay = action.payload;
    },
  },
});

export const { switchCartOverlay } = isOpenCartOverlaySlice.actions;

export default isOpenCartOverlaySlice.reducer;
