import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ProductModel} from '../../model/product.model';

interface CartState {
  items: ProductModel[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductModel>) => {
      const existingItem = state.items.find(
        item => item.id === action.payload.id,
      );
      if (existingItem) {
        const currentQty = (existingItem?.quantity ?? 0) + 1;
        existingItem.quantity = currentQty; // Increment quantity if item already exists
      } else {
        state.items.push({...action.payload, quantity: 1}); // Add new item with quantity 1
      }
    },
    deleteFromCart: (state, action: PayloadAction<number>) => {
      // Remove item by its ID
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    reduceFromCart: (state, action: PayloadAction<number>) => {
      const existingItem = state.items.find(item => item.id === action.payload);
      if (existingItem) {
        if ((existingItem?.quantity ?? 0) > 1) {
          const currentQty = (existingItem?.quantity ?? 0) - 1; // Decrement quantity if greater than 1
          existingItem.quantity = currentQty; // Increment quantity if item already exists
        } else {
          state.items = state.items.filter(item => item.id !== action.payload); // Remove item if quantity is 1
        }
      }
    },
    // ...other reducers
  },
});

export const {addToCart, deleteFromCart, reduceFromCart} = cartSlice.actions;
export default cartSlice.reducer;
