import { createSlice } from '@reduxjs/toolkit';

export const cartListSlice = createSlice({
  name: 'cartList',
  initialState: {
    cartList: JSON.parse(localStorage.getItem('Scandicart')) || [],
  },
  reducers: {
    addToCartList: (state, action) => {
      const updateLocalStorage = (newCartListState) => {
        localStorage.setItem('Scandicart', JSON.stringify(newCartListState));
      };
      if (state.cartList.length === 0) {
        updateLocalStorage([action.payload]);
        return (state = {
          ...state,
          cartList: [action.payload],
        });
      }
      let index = state.cartList.findIndex(
        (item) => item.product.name === action.payload.product.name
      );
      if (index === -1) {
        const newCartListState = [...state.cartList, action.payload];
        updateLocalStorage(newCartListState);
        return (state = {
          ...state,
          cartList: newCartListState,
        });
      }
      for (let i = index; i < state.cartList.length; i++) {
        if (
          JSON.stringify(state.cartList[i].setAttributes) ===
          JSON.stringify(action.payload.setAttributes)
        ) {
          const copy = JSON.parse(JSON.stringify(state.cartList[i]));
          copy.count += 1;
          const newCartListState = [
            ...state.cartList.slice(0, i),
            copy,
            ...state.cartList.slice(i + 1),
          ];
          updateLocalStorage(newCartListState);
          return (state = {
            ...state,
            cartList: newCartListState,
          });
        }
      }
      updateLocalStorage([...state.cartList, action.payload]);
      return (state = {
        ...state,
        cartList: [...state.cartList, action.payload],
      });
    },

    deleteFromCartList: (state, action) => {
      let index = state.cartList.findIndex(
        (item) => item.id === action.payload
      );
      const newState = [
        ...state.cartList.slice(0, index),
        ...state.cartList.slice(index + 1),
      ];
      localStorage.setItem('Scandicart', JSON.stringify(newState));
      return (state = {
        ...state,
        cartList: newState,
      });
    },

    checkOutCartList: (state, action) => {
      localStorage.removeItem('Scandicart');
      return (state = {
        ...state,
        cartList: [],
      });
    },

    updateCountInCartList: (state, action) => {
      let index = state.cartList.findIndex(
        (item) => item.id === action.payload.id
      );
      const copy = JSON.parse(JSON.stringify(state.cartList[index]));
      copy.count = action.payload.count;
      const newState = [
        ...state.cartList.slice(0, index),
        copy,
        ...state.cartList.slice(index + 1),
      ];
      localStorage.setItem('Scandicart', JSON.stringify(newState));
      return (state = {
        ...state,
        cartList: newState,
      });
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
