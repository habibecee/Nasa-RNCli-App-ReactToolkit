import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	data: {},
	loading: 'idle',
	error: null,
};

export const fetchDaily = createAsyncThunk('daily/fetch', async () => {
	const response = await axios.get(
		'https://api.nasa.gov/planetary/apod?api_key=cEUefLmN7wOUHdRKsN922wmmrXezy47lcENLWleD',
	);
	return response.data;
});

const DailySlice = createSlice({
	name: 'daily',
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(fetchDaily.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.data = {};
			})
			.addCase(fetchDaily.fulfilled, (state, action) => {
				state.loading = false;
				state.data = action.payload;
				state.error = null;
			})
			.addCase(fetchDaily.rejected, (state, action) => {
				state.error = true;
				state.loading = false;
				state.data = {};
			});
	},
});

export default DailySlice.reducer;
