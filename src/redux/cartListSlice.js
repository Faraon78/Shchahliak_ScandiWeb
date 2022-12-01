import { createSlice } from '@reduxjs/toolkit';

const LOCAL_STORAGE_NAME = 'Scandicart';

export const cartListSlice = createSlice({
  name: 'cartList',
  initialState: {
    cartList: JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME)) || [],
  },
  reducers: {
    addToCartList: (state, action) => {
      const updateLocalStorage = (newCartListState) => {
        localStorage.setItem(
          LOCAL_STORAGE_NAME,
          JSON.stringify(newCartListState)
        );
      };

      if (state.cartList.length === 0) {
        updateLocalStorage([action.payload]);
        state.cartList = [action.payload];
        return state;
      }

      let index = state.cartList.findIndex(
        (item) => item.product.name === action.payload.product.name
      );

      if (index === -1) {
        state.cartList = [...state.cartList, action.payload];
        updateLocalStorage(state.cartList);
        return state;
      }

      for (let i = index; i < state.cartList.length; i++) {
        if (
          JSON.stringify(state.cartList[i].setAttributes) ===
          JSON.stringify(action.payload.setAttributes)
        ) {
          state.cartList[i].count += 1;
          updateLocalStorage(state.cartList);
          return state;
        }
      }
      updateLocalStorage([...state.cartList, action.payload]);
      return (state = {
        ...state,
        cartList: [...state.cartList, action.payload],
      });
    },

    deleteFromCartList: (state, action) => {
      state.cartList = state.cartList.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(state.cartList));
      return state;
    },

    checkOutCartList: (state, action) => {
      localStorage.removeItem(LOCAL_STORAGE_NAME);
      state.cartList = [];
      return state;
    },

    updateCountInCartList: (state, action) => {
      let index = state.cartList.findIndex(
        (item) => item.id === action.payload.id
      );
      state.cartList[index].count = action.payload.count;
      localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(state.cartList));
      return state;
    },
  },
});

export const {
  addToCartList,
  deleteFromCartList,
  updateCountInCartList,
  checkOutCartList,
} = cartListSlice.actions;

export default cartListSlice.reducer;
