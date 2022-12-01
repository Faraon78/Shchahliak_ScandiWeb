import { configureStore } from '@reduxjs/toolkit';
import selectedCurrencyReducer from './selectedCurrencySlice';
import cartListReducer from './cartListSlice';
import isOpenListCurrenciesReducer from './isOpenCurrenciesSlice';
import isOpenCartOverlayReducer from './isOpenCartOverlaySlice';

export default configureStore({
  reducer: {
    selectedCurrency: selectedCurrencyReducer,
    isOpenListCurrencies: isOpenListCurrenciesReducer,
    isOpenCartOverlay: isOpenCartOverlayReducer,
    cartList: cartListReducer,
  },
});
