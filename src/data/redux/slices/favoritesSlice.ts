import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ProductModel} from '../../../data/model/product.model'; // Adjust the import path as necessary

interface FavoritesState {
  favorites: ProductModel[]; // Change to use ProductModel
}

const initialState: FavoritesState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<ProductModel>) => {
      // Check if the product is already in favorites
      const exists = state.favorites.find(
        product => product.id === action.payload.id,
      );
      if (!exists) {
        state.favorites.push(action.payload); // Add the product if not already present
      }
    },
    removeFavorite: (state, action: PayloadAction<ProductModel>) => {
      // Assuming id is a number
      state.favorites = state.favorites.filter(
        product => product.id !== action.payload.id,
      );
    },
    clearFavorites: state => {
      state.favorites = [];
    },
  },
});

// Export actions and reducer
export const {addFavorite, removeFavorite, clearFavorites} =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
