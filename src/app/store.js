import { configureStore } from '@reduxjs/toolkit';
import searchTermReducer from '../features/searchTerm/searchTermSlice';
import filterReducer from '../features/filter/filterSlice';

export default configureStore({
  reducer: {
    searchTerm: searchTermReducer,
    filter: filterReducer
  },
});