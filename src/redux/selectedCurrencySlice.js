import { createSlice } from '@reduxjs/toolkit';

export const LOCAL_STORAGE_NAME_CURRENCY = 'Scandicurrency';

export const selectedCurrencySlice = createSlice({
  name: 'selectedCurrency',
  initialState: {
    selectedCurrency: JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_NAME_CURRENCY)
    ) || {
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
