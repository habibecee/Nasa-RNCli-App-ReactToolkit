import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosInstance from '../../Utils/axios';

const initialState = {
  data: {},
  loading: 'idle',
  error: null,
};

export const fetchEvents = createAsyncThunk('events/fetch', async id => {
  const response = await axiosInstance.get(`events`);
  return response.data.events;
});

const EventsSlice = createSlice({
  name: 'events',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchEvents.pending, state => {
        state.loading = true;
        state.error = null;
        state.data = {};
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchEvents.rejected, state => {
        state.error = action.error.message;
        state.loading = false;
        state.data = {};
      });
  },
});

export default EventsSlice.reducer;
