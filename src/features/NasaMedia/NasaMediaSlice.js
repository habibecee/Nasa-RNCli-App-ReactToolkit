import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  data: [],
  loading: 'idle',
  error: null,
};

export const fetchNasaImages = createAsyncThunk(
  'nasaMediaImages/fetch',
  async query => {
    const response = await axios.get(
      `https://images-api.nasa.gov/search?q=${query}&media_type=image`,
    );

    return response.data.collection;
  },
);

export const fetchNasaVideos = createAsyncThunk(
  'nasaMediaVideos/fetch',
  async query => {
    const response = await axios.get(
      `https://images-api.nasa.gov/search?q=${query}&media_type=video`,
    );

    return response.data.collection;
  },
);

const NasaMediaSlice = createSlice({
  name: 'nasaMedia',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchNasaImages.pending, state => {
        state.loading = true;
        state.status = 'loading';
        state.data = [];
        state.error = null;
      })
      .addCase(fetchNasaImages.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'succeeded';
        state.loading = false;
        state.error = null;
        console.log(action.payload);
      })
      .addCase(fetchNasaImages.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = 'failed';
        state.loading = false;
        state.data = [];
      })
      .addCase(fetchNasaVideos.pending, state => {
        state.loading = true;
        state.status = 'loading';
        state.data = [];
        state.error = null;
      })
      .addCase(fetchNasaVideos.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'succeeded';
        state.loading = false;
        state.error = null;
        console.log(action.payload);
      })
      .addCase(fetchNasaVideos.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = 'failed';
        state.loading = false;
        state.data = [];
      });
  },
});

export default NasaMediaSlice.reducer;
