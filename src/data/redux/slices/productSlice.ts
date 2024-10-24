import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getApi} from '../../../core/services/restApi';
import {ProductModel} from '../../model/product.model';

// Define the initial state type
interface ProductState {
  products: ProductModel[];
  hasMore: boolean;
  errorMessage: string;
}

// Define the parameters for fetching products
interface FetchProductsParams {
  limit?: number;
  skip?: number;
  query?: string;
  category?: string;
}

// Define the response type from the fetchProducts thunk
interface FetchProductsResponse {
  success: boolean;
  products: ProductModel[]; // Adjust this based on your API response structure
  message: string; // Capture error message
}

export const fetchProducts = createAsyncThunk<
  FetchProductsResponse,
  FetchProductsParams
>(
  'products/fetchProducts',
  async ({limit = 5, skip = 0, query = '', category = ''}) => {
    const url =
      category && category !== ''
        ? `products/category/${category}?q=${query}&limit=${limit}&skip=${skip}`
        : `products/search?q=${query}&limit=${limit}&skip=${skip}`;

    const response = await getApi({data: {}, url});

    // Return both the success flag and products
    return {
      success: response.success,
      products: response.data.products || [], // Adjust this based on your API response structure
      message: response.message, // Capture error message
    };
  },
);

const initialState: ProductState = {
  products: [],
  hasMore: true,
  errorMessage: '', // Initialize error message
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    resetProducts: state => {
      state.products = [];
      state.hasMore = true;
      state.errorMessage = ''; // Reset error message
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      // Ensure action.payload is correctly typed
      if (action.payload.success) {
        state.products = [...state.products, ...action.payload.products];
        state.hasMore = action.payload.products.length > 0; // Check if more products are available
        state.errorMessage = ''; // Clear error message on success
      } else {
        state.errorMessage = action.payload.message; // Set error message
      }
    });
    // Optionally handle pending and rejected states to manage loading and error states
    builder.addCase(fetchProducts.pending, state => {
      state.errorMessage = ''; // Clear error message on new request
    });
    builder.addCase(fetchProducts.rejected, state => {
      state.errorMessage = 'Failed to fetch products'; // Set a generic error message
    });
  },
});

export const {resetProducts} = productSlice.actions;
export default productSlice.reducer;
