import {configureStore} from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import CategoriesReducer from '../features/Categories/CategoriesSlice';
import CategoryDetailsReducer from '../features/CategoryDetails/CategoryDetailsSlice';
import DailyReducer from '../features/Daily/DailySlice';
import EventDetailsReducer from '../features/EventDetails/EventDetailsSlice';
import EventsReducer from '../features/Events/EventsSlice';
import NasaMediaReducer from '../features/NasaMedia/NasaMediaSlice';
import NasaMediaDetailsReducer from '../features/NasaMediaDetails/NasaMediaDetailsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    Categories: CategoriesReducer,
    Events: EventsReducer,
    Daily: DailyReducer,
    CategoryDetails: CategoryDetailsReducer,
    EventDetails: EventDetailsReducer,
    NasaMedia: NasaMediaReducer,
    NasaMediaDetails: NasaMediaDetailsReducer,
  },
});
