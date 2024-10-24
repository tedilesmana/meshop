// src/redux/selectedCategorySlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface SelectedCategoryState {
  category: any | null;
}

const initialState: SelectedCategoryState = {
  category: null,
};

const selectedCategorySlice = createSlice({
  name: 'selectedCategory',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<any>) => {
      state.category = action.payload;
    },
    clearSelectedCategory: state => {
      state.category = null;
    },
  },
});

export const {setSelectedCategory, clearSelectedCategory} =
  selectedCategorySlice.actions;
export default selectedCategorySlice.reducer;
