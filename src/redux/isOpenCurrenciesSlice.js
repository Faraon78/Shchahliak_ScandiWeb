import { createSlice } from '@reduxjs/toolkit';

export const isOpenListCurrenciesSlice = createSlice({
  name: ' isOpenListCurrencies',
  initialState: {
    isOpenListCurrencies: false,
  },

  reducers: {
    switchListCurrencies: (state, action) => {
      state.isOpenListCurrencies = action.payload;
    },
  },
});

export const { switchListCurrencies } = isOpenListCurrenciesSlice.actions;

export default isOpenListCurrenciesSlice.reducer;
