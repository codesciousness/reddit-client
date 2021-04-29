import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loadComments = createAsyncThunk('comments/loadComments',
async (postId) => {
    const response = await fetch(`https://www.reddit.com/r/science/comments/${postId}.json`);
    const json = await response.json();
    return json[1].data.children.map(obj => ({
        id: obj.data.id,
        author: obj.data.author,
        created: obj.data.created_utc,
        body: obj.data.body,
        ups: obj.data.ups
    }));
});

const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        comments: [],
        loadingComments: false,
        loadCommentsError: false
    },
    reducers: {},
    extraReducers: {
        [loadComments.pending]: (state, action) => {
            state.loadingComments = true;
            state.loadCommentsError = false;
        },
        [loadComments.fulfilled]: (state, action) => {
            state.loadingComments = false;
            state.loadCommentsError = false;
            state.comments = action.payload;
        },
        [loadComments.rejected]: (state, action) => {
            state.loadingComments = false;
            state.loadCommentsError = true;
        }
    }
});

export default commentsSlice.reducer;

export const selectComments = state => state.comments.comments;
export const selectLoadingComments = state => state.comments.loadingComments;
export const selectLoadCommentsError = state => state.comments.loadCommentsError;