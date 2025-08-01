import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// ✅ Exporting Product interface for use in components
export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
}

interface ProductState {
  items: Product[];
  filteredItems: Product[];
  loading: boolean;
  error: string | null;
  categoryFilter: string;
  priceSort: string;
}

const initialState: ProductState = {
  items: [],
  filteredItems: [],
  loading: false,
  error: null,
  categoryFilter: 'All',
  priceSort: 'none',
};

// ✅ Fetch products from API
export const getProducts = createAsyncThunk<Product[]>(
  'products/fetch',
  async () => {
    const response = await axios.get<Product[]>('https://fakestoreapi.com/products');
    return response.data;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCategoryFilter: (state, action: PayloadAction<string>) => {
      state.categoryFilter = action.payload;
      productSlice.caseReducers.applyFilters(state);
    },
    setPriceSort: (state, action: PayloadAction<string>) => {
      state.priceSort = action.payload;
      productSlice.caseReducers.applyFilters(state);
    },
    applyFilters: (state) => {
      let products = [...state.items];

      if (state.categoryFilter !== 'All') {
        products = products.filter((p) => p.category === state.categoryFilter);
      }

      if (state.priceSort === 'asc') {
        products.sort((a, b) => a.price - b.price);
      } else if (state.priceSort === 'desc') {
        products.sort((a, b) => b.price - a.price);
      }

      state.filteredItems = products;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.items = action.payload;
        state.filteredItems = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

export const { setCategoryFilter, setPriceSort } = productSlice.actions;
export default productSlice.reducer;
