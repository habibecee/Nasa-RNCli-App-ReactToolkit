import {configureStore} from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import CategoriesReducer from '../features/Categories/CategoriesSlice';
import CategoryDetailsReducer from '../features/CategoryDetails/CategoryDetailsSlice';
import DailyReducer from '../features/Daily/DailySlice';
import EventDetailsReducer from '../features/EventDetails/EventDetailsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    Categories: CategoriesReducer,
    Daily: DailyReducer,
    CategoryDetails: CategoryDetailsReducer,
    EventDetails: EventDetailsReducer,
  },
});
