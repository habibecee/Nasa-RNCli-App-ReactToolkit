import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosInstance from '../../Utils/axios';

const initialState = {
  data: [],
  loading: 'idle',
  error: null,
};

export const fetchCategoryDetails = createAsyncThunk(
  'categoryDetails/fetch',
  async id => {
    const response = await axiosInstance.get(`categories/${id}`);

    return response.data;
  },
);

const CategoryDetailsSlice = createSlice({
  name: 'categoryDetails',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchCategoryDetails.pending, state => {
        state.loading = true;
        state.error = null;
        state.data = [];
      })
      .addCase(fetchCategoryDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchCategoryDetails.rejected, state => {
        state.error = action.error.message;
        state.loading = false;
        state.data = [];
      });
  },
});

export default CategoryDetailsSlice.reducer;
