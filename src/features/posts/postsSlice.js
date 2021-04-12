import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { selectSearchTerm } from '../searchTerm/searchTermSlice';
import { selectFilter } from '../filter/filterSlice';

export const loadTrendingPosts = createAsyncThunk('posts/loadTrendingPosts',
async () => {
    const response = await fetch('https://www.reddit.com/r/science/hot.json');
    const json = await response.json();
    return json.data.children.map(obj => ({
        id: obj.data.id,
        title: obj.data.title,
        author: obj.data.author,
        created: obj.data.created_utc,
        flair: obj.data.link_flair_text,
        thumbnail: obj.data.thumbnail,
        commentNum: obj.data.num_comments,
        url: obj.data.url
    }));
});

export const loadLatestPosts = createAsyncThunk('posts/loadLatestPosts',
async () => {
    const response = await fetch('https://www.reddit.com/r/science/new.json');
    const json = await response.json();
    return json.data.children.map(obj => ({
        id: obj.data.id,
        title: obj.data.title,
        author: obj.data.author,
        created: obj.data.created_utc,
        flair: obj.data.link_flair_text,
        thumbnail: obj.data.thumbnail,
        commentNum: obj.data.num_comments,
        url: obj.data.url
    }));
});

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        currentPost: null,
        trendingPosts: [],
        latestPosts: [],
        loadingTrendingPosts: false,
        loadTrendingPostsError: false,
        loadingLatestPosts: false,
        loadLatestPostsError: false,
    },
    reducers: {
        setCurrentPost: (state, action) => {
            let postId = action.payload;
            state.currentPost = postId;
            return state;
        }
    },
    extraReducers: {
        [loadTrendingPosts.pending]: (state, action) => {
            state.loadingTrendingPosts = true;
            state.loadTrendingPostsError = false;
        },
        [loadTrendingPosts.fulfilled]: (state, action) => {
            state.loadingTrendingPosts = false;
            state.loadTrendingPostsError = false;
            state.trendingPosts = action.payload;
        },
        [loadTrendingPosts.rejected]: (state, action) => {
            state.loadingTrendingPosts = false;
            state.loadTrendingPostsError = true;
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
        }
    }
});

export const { setCurrentPost } = postsSlice.actions;
export default postsSlice.reducer;

export const selectCurrentPost = state => state.posts.currentPost;
export const selectTrendingPosts = state => state.posts.trendingPosts;
export const selectLoadingTrendingPosts = state => state.posts.loadingTrendingPosts;
export const selectLoadTrendingPostsError = state => state.posts.loadTrendingPostsError;
export const selectLatestPosts = state => state.posts.latestPosts;
export const selectLoadingLatestPosts = state => state.posts.loadingLatestPosts;
export const selectLoadLatestPostsError = state => state.posts.loadLatestPostsError;

export const selectFilteredTrendingPosts = state => {
    const filter = selectFilter(state);
    const searchTerm = selectSearchTerm(state);
    let trendingPosts = selectTrendingPosts(state);
    if (filter) {
        trendingPosts = trendingPosts.filter(post => post.flair === filter);
    }
    if (searchTerm) {
        trendingPosts = trendingPosts.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    trendingPosts = trendingPosts.filter((post, i) => i < 5);
    return trendingPosts;
};

export const selectFilteredLatestPosts = state => {
    const filter = selectFilter(state);
    const searchTerm = selectSearchTerm(state);
    let latestPosts = selectLatestPosts(state);
    if (filter) {
        latestPosts = latestPosts.filter(post => post.flair === filter);
    }
    if (searchTerm) {
        latestPosts = latestPosts.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    return latestPosts;
};