import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosInstance from '../../Utils/axios';

const initialState = {
  data: [],
  loading: 'idle',
  error: null,
};

export const fetchCategories = createAsyncThunk(
  'categories/fetch',
  async () => {
    const response = await axiosInstance.get('categories');
    return response.data.categories;
  },
);

const CategoriesSlice = createSlice({
  name: 'categories',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.pending, state => {
        state.loading = true;
        state.error = null;
        state.data = [];
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
        console.log(action.payload);
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
        state.data = [];
      });
  },
});

export default CategoriesSlice.reducer;
