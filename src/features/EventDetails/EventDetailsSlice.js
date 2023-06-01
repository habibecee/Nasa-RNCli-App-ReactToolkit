import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosInstance from '../../Utils/axios';

const initialState = {
  data: {},
  loading: 'idle',
  error: null,
};

export const fetchEventDetails = createAsyncThunk(
  'eventDetails/fetch',
  async id => {
    const response = await axiosInstance.get(`events/${id}`);

    return response.data;
  },
);

const EventDetailsSlice = createSlice({
  name: 'eventDetails',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchEventDetails.pending, state => {
        state.loading = true;
        state.error = null;
        state.data = {};
      })
      .addCase(fetchEventDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchEventDetails.rejected, state => {
        state.error = action.error.message;
        state.loading = false;
        state.data = {};
      });
  },
});

export default EventDetailsSlice.reducer;
