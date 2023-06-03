import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  data: [],
  loading: 'idle',
  error: null,
};

export const fetchMediaDetails = createAsyncThunk(
  'nasaMediaDetails/fetch',
  async id => {
    try {
      const response = await axios.get(id);
      const data = response.data; // Yanıtın JSON verisi

      return data;
    } catch (error) {
      throw error;
    }
  },
);

const NasaMediaDetailsSlice = createSlice({
  name: 'nasaMediaDetails',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchMediaDetails.pending, state => {
        state.loading = true;
        state.status = 'loading';
        state.data = [];
        state.error = null;
      })
      .addCase(fetchMediaDetails.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'succeeded';
        state.loading = false;
        state.error = null;
        console.log(action.payload);
      })
      .addCase(fetchMediaDetails.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = 'failed';
        state.loading = false;
        state.data = [];
      });
  },
});

export default NasaMediaDetailsSlice.reducer;
