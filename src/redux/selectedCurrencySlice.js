import { createSlice } from '@reduxjs/toolkit';

export const selectedCurrencySlice = createSlice({
  name: 'selectedCurrency',
  initialState: {
    selectedCurrency: JSON.parse(localStorage.getItem('Scandicurrency')) || {
      symbol: '$',
      label: 'USD',
    },
  },
  reducers: {
    switchCurrency: (state, action) => {
      state.selectedCurrency = action.payload;
    },
  },
});

export const { switchCurrency } = selectedCurrencySlice.actions;

export default selectedCurrencySlice.reducer;
