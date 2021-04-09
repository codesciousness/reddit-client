import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loadTrendingPosts = createAsyncThunk('posts/loadTrendingPosts',
async () => {
    const response = await fetch('https://www.reddit.com/r/science/hot.json');
    const json = await response.json();
    return json.data.children;
}
);

export const loadLatestPosts = createAsyncThunk('posts/loadLatestPosts',
async () => {
    const response = await fetch('https://www.reddit.com/r/science/new.json');
    const json = await response.json();
    return json.data.children;
}
);

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        trendingPosts: {},
        latestPosts: {},
        loadingTendingPosts: false,
        loadTendingPostsError: false,
        loadingLatestPosts: false,
        loadLatestPostsError: false,
    },
    reducers: {},
    extraReducers: {
        [loadTrendingPosts.pending]: (state, action) => {
            state.loadingTendingPosts = true;
            state.loadTendingPostsError = false;
        },
        [loadTrendingPosts.fulfilled]: (state, action) => {
            state.loadingTendingPosts = false;
            state.loadTendingPostsError = false;
            state.trendingPosts = action.payload;
        },
        [loadTrendingPosts.rejected]: (state, action) => {
            state.loadingTendingPosts = false;
            state.loadTendingPostsError = true;
        },
        [loadLatestPosts.pending]: (state, action) => {
            state.loadingLatestPosts = true;
            state.loadLatestPostsError = false;
        },
        [loadLatestPosts.fulfilled]: (state, action) => {
            state.loadingLatestPosts = false;
            state.loadLatestPostsError = false;
            state.latestPosts = action.payload;
        },
        [loadLatestPosts.rejected]: (state, action) => {
            state.loadingLatestPosts = false;
            state.loadLatestPostsError = true;
        },
    }
});

export default postsSlice.reducer;

export const selectTrendingPosts = state => state.posts.trendingPosts;
export const selectLatestPosts = state => state.posts.latestPosts;