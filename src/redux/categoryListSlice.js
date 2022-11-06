import { createSlice } from '@reduxjs/toolkit';

export const categoryListSlice = createSlice({
  name: 'categoryList',
  initialState: {
    categoryList: [],
  },
  reducers: {
    updateCategoryList: (state, action) => {
      state.categoryList = action.payload;
    },
  },
});

export const { updateCategoryList } = categoryListSlice.actions;

export default categoryListSlice.reducer;
