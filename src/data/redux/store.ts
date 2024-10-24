// src/redux/store.ts
import {configureStore} from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice';
import favoritesReducer from './slices/favoritesSlice';
import categoriesReducer from './slices/categoriesSlice';
import selectedCategoryReducer from './slices/selectedCategorySlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    favorites: favoritesReducer,
    categories: categoriesReducer,
    selectedCategory: selectedCategoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
