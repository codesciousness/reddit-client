import { configureStore } from '@reduxjs/toolkit';
import searchTermReducer from '../features/searchTerm/searchTermSlice';
import filterReducer from '../features/filter/filterSlice';
import postsReducer from '../features/posts/postsSlice';
import commentsReducer from '../features/comments/commentsSlice';

export default configureStore({
  reducer: {
    searchTerm: searchTermReducer,
    filter: filterReducer,
    posts: postsReducer,
    comments: commentsReducer
  },
});