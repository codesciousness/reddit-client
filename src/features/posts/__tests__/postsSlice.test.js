import { Reducer, Selector, Thunk } from 'redux-testkit';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Immutable from 'seamless-immutable';
import postsReducer,
{   setCurrentPost,
    loadTrendingPosts,
    loadLatestPosts,
    selectCurrentPost,
    selectTrendingPosts,
    selectLoadingTrendingPosts,
    selectLoadTrendingPostsError,
    selectLatestPosts,
    selectLoadingLatestPosts,
    selectLoadLatestPostsError,
    selectFilteredTrendingPosts,
    selectFilteredLatestPosts
} from '../postsSlice';
global.fetch = require('jest-fetch-mock');

const initialState = Immutable({
    currentPost: null,
    trendingPosts: [],
    latestPosts: [],
    loadingTrendingPosts: false,
    loadTrendingPostsError: false,
    loadingLatestPosts: false,
    loadLatestPostsError: false
});

const mockStore = configureStore([thunk]);

describe('postsReducer', () => {
    test('returns initial state when an empty or undefined action is dispatched', () => {
        expect(postsReducer(undefined, {})).toEqual(initialState);
        expect(postsReducer(undefined, {type: 'undefined'})).toEqual(initialState);
    });
});

describe('setCurrentPost', () => {
    test('', () => {
        
    });
});

describe('loadTrendingPosts', () => {
    test('', () => {
        
    });
});

describe('loadLatestPosts', () => {
    test('', () => {
        
    });
});

describe('selectCurrentPost', () => {
    test('', () => {
        
    });
});

describe('selectTrendingPosts', () => {
    test('', () => {
        
    });
});

describe('selectLoadingTrendingPosts', () => {
    test('', () => {
        
    });
});

describe('selectLoadTrendingPostsError', () => {
    test('', () => {
        
    });
});

describe('selectLatestPosts', () => {
    test('', () => {
        
    });
});

describe('selectLoadingLatestPosts', () => {
    test('', () => {
        
    });
});

describe('selectLoadLatestPostsError', () => {
    test('', () => {
        
    });
});

describe('selectFilteredTrendingPosts', () => {
    test('', () => {
        
    });
});

describe('selectFilteredLatestPosts', () => {
    test('', () => {
        
    });
});