import { createSlice } from '@reduxjs/toolkit';

export const cartListSlice = createSlice({
  name: 'cartList',
  initialState: {
    cartList: JSON.parse(localStorage.getItem('Scandicart')) || [],
  },
  reducers: {
    addToCartList: (state, action) => {
      if (state.cartList.length > 0) {
        let index = state.cartList.findIndex(
          (item) => item.product.name === action.payload.product.name
        );
        if (index > -1) {
          if (
            JSON.stringify(state.cartList[index].setAttributes) ===
            JSON.stringify(action.payload.setAttributes)
          ) {
            const copy1 = JSON.parse(JSON.stringify(state.cartList[index]));
            copy1.count += 1;
            const newState = [
              ...state.cartList.slice(0, index),
              copy1,
              ...state.cartList.slice(index + 1),
            ];
            localStorage.setItem('Scandicart', JSON.stringify(newState));
            return (state = {
              ...state,
              cartList: newState,
            });
          } else {
            localStorage.setItem(
              'Scandicart',
              JSON.stringify([...state.cartList, action.payload])
            );
            return (state = {
              ...state,
              cartList: [...state.cartList, action.payload],
            });
          }
        } else {
          localStorage.setItem(
            'Scandicart',
            JSON.stringify([...state.cartList, action.payload])
          );
          return (state = {
            ...state,
            cartList: [...state.cartList, action.payload],
          });
        }
      } else {
        localStorage.setItem(
          'Scandicart',
          JSON.stringify([...state.cartList, action.payload])
        );
        return (state = {
          ...state,
          cartList: [...state.cartList, action.payload],
        });
      }
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
