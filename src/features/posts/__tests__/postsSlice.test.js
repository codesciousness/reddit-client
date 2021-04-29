//import { Reducer, Selector, Thunk } from 'redux-testkit';
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

const mockStore = configureStore([thunk]);

const trendingPosts = [
    {
        id: 'efgh2i',
        title: 'Where Can the Solar Eclipse be Viewed Next Week',
        author: 'ScienceResearcher',
        created: 1619644886,
        flair: 'Astronomy',
        thumbnail: 'https://source.unsplash.com/140x140/?astronomy',
        commentNum: 25,
        url: 'https://www.sciencemag.org/'
    },
    {
        id: 'jklm3n',
        title: 'An Overview of Traditional Diets Versus Modern Diets',
        author: 'ScienceLover',
        created: 1619652318,
        flair: 'Health',
        thumbnail: 'https://source.unsplash.com/140x140/?health',
        commentNum: 6,
        url: 'https://www.nutrition.org/'
    }
];

const latestPosts = [
    {
        id: 'opqr4s',
        title: 'Causes of Reproductive Stress on Animals in Declining Habitats',
        author: 'ScienceGuy',
        created: 1619644886,
        flair: 'Biology',
        thumbnail: 'https://source.unsplash.com/140x140/?biology',
        commentNum: 2,
        url: 'https://www.nature.com/'
    },
    {
        id: 'tuvw5x',
        title: 'Activation of the Brain in Subjects With High And Average Intelligence',
        author: 'ScienceObserver',
        created: 1619652318,
        flair: 'Neuroscience',
        thumbnail: 'https://source.unsplash.com/140x140/?neuroscience',
        commentNum: 3,
        url: 'https://www.jneurosci.org/'
    }
];

describe('postsReducer', () => {
    const initialState = Immutable({
        currentPost: null,
        trendingPosts: [],
        latestPosts: [],
        loadingTrendingPosts: false,
        loadTrendingPostsError: false,
        loadingLatestPosts: false,
        loadLatestPostsError: false
    });

    test('returns initial state when an empty or undefined action is dispatched', () => {
        expect(postsReducer(undefined, {})).toEqual(initialState);
        expect(postsReducer(undefined, {type: 'undefined'})).toEqual(initialState);
    });

    test('returns correct state when setCurrentPost action is dispatched', () => {
        expect(postsReducer(initialState, {type: 'posts/setCurrentPost', payload: 'jklm3n'})).toMatchSnapshot();
    });
    test('returns correct state when loadTrendingPosts/pending action is dispatched', () => {
        expect(postsReducer(initialState, {type: 'posts/loadTrendingPosts/pending'})).toMatchSnapshot();
    });
    test('returns correct state when loadTrendingPosts/fulfilled action is dispatched', () => {
        expect(postsReducer(initialState, {type: 'posts/loadTrendingPosts/fulfilled', payload: trendingPosts})).toMatchSnapshot();
    });
    test('returns correct state when loadTrendingPosts/rejected action is dispatched', () => {
        expect(postsReducer(initialState, {type: 'posts/loadTrendingPosts/rejected'})).toMatchSnapshot();
    });
    test('returns correct state when loadLatestPosts/pending action is dispatched', () => {
        expect(postsReducer(initialState, {type: 'posts/loadLatestPosts/pending'})).toMatchSnapshot();
    });
    test('returns correct state when loadLatestPosts/fulfilled action is dispatched', () => {
        expect(postsReducer(initialState, {type: 'posts/loadLatestPosts/fulfilled', payload: latestPosts})).toMatchSnapshot();
    });
    test('returns correct state when loadLatestPosts/rejected action is dispatched', () => {
        expect(postsReducer(initialState, {type: 'posts/loadLatestPosts/rejected'})).toMatchSnapshot();
    });
});

describe('Action Handlers', () => {
    let store;
    
    beforeEach(() => {
        store = mockStore({
            posts: {
                currentPost: null,
                trendingPosts: [],
                latestPosts: [],
                loadingTrendingPosts: false,
                loadTrendingPostsError: false,
                loadingLatestPosts: false,
                loadLatestPostsError: false
            }
        });
        fetch.resetMocks();
    });

    describe('setCurrentPost', () => {
        test('generates the correct action to set the current post with initial state', () => {
            store.dispatch(setCurrentPost('jklm3n'));
            const actions = store.getActions();
            const expectedAction = {type: 'posts/setCurrentPost', payload: 'jklm3n'};
            expect(actions).toEqual([expectedAction]);
        });
        test('generates the correct action to set the current post with existing state', () => {
            store = mockStore({
                posts: {
                    currentPost: 'jklm3n'
                }
            });
            store.dispatch(setCurrentPost('tuvw5x'));
            const actions = store.getActions();
            const expectedAction = {type: 'posts/setCurrentPost', payload: 'tuvw5x'};
            expect(actions).toEqual([expectedAction]);
        });
    });
    
    describe('loadTrendingPosts', () => {
        test('it should return trending posts from reddit when fetch is successful', async () => {
            const data = require('./trending-test-data.json');
            fetch.mockResponse(JSON.stringify(data), { status: 200 });
            const returnFunc = await loadTrendingPosts();
            await returnFunc(store.dispatch);
            const actions = store.getActions();
            const action1 = {type: actions[0].type};
            const action2 = {type: actions[1].type, payload: actions[1].payload};
            expect(actions).toHaveLength(2);
            expect(action1).toEqual({type: 'posts/loadTrendingPosts/pending'});
            expect(action2).toEqual({type: 'posts/loadTrendingPosts/fulfilled', payload: trendingPosts});
        });
        test('it should return error message when fetch is unsuccessful', async () => {
            fetch.mockResponse(JSON.stringify({}), { status: 500 });
            const returnFunc = await loadTrendingPosts();
            await returnFunc(store.dispatch);
            const actions = store.getActions();
            const action1 = {type: actions[0].type};
            const action2 = {type: actions[1].type, payload: actions[1].payload, error: actions[1].error.message};
            expect(actions).toHaveLength(2);
            expect(action1).toEqual({type: 'posts/loadTrendingPosts/pending'});
            expect(action2).toEqual({type: 'posts/loadTrendingPosts/rejected', payload: undefined, error: "Cannot read property 'children' of undefined"});
        });
    });
    
    describe('loadLatestPosts', () => {
        test('it should return latest posts from reddit when fetch is successful', async () => {
            const data = require('./latest-test-data.json');
            fetch.mockResponse(JSON.stringify(data), { status: 200 });
            const returnFunc = await loadLatestPosts();
            await returnFunc(store.dispatch);
            const actions = store.getActions();
            const action1 = {type: actions[0].type};
            const action2 = {type: actions[1].type, payload: actions[1].payload};
            expect(actions).toHaveLength(2);
            expect(action1).toEqual({type: 'posts/loadLatestPosts/pending'});
            expect(action2).toEqual({type: 'posts/loadLatestPosts/fulfilled', payload: latestPosts});
        });
        test('it should return error message when fetch is unsuccessful', async () => {
            fetch.mockResponse(JSON.stringify({}), { status: 500 });
            const returnFunc = await loadLatestPosts();
            await returnFunc(store.dispatch);
            const actions = store.getActions();
            const action1 = {type: actions[0].type};
            const action2 = {type: actions[1].type, payload: actions[1].payload, error: actions[1].error.message};
            expect(actions).toHaveLength(2);
            expect(action1).toEqual({type: 'posts/loadLatestPosts/pending'});
            expect(action2).toEqual({type: 'posts/loadLatestPosts/rejected', payload: undefined, error: "Cannot read property 'children' of undefined"});
        });
    });
});

describe('Selectors', () => {
    const emptyState = Immutable({
        filter: '',
        searchTerm: '',
        posts: {
            currentPost: null,
            trendingPosts: [],
            latestPosts: [],
            loadingTrendingPosts: false,
            loadTrendingPostsError: false,
            loadingLatestPosts: false,
            loadLatestPostsError: false
        }
    });

    const emptyState2 = Immutable({
        filter: '',
        searchTerm: '',
        posts: {
            currentPost: null,
            trendingPosts: trendingPosts,
            latestPosts: latestPosts,
            loadingTrendingPosts: false,
            loadTrendingPostsError: false,
            loadingLatestPosts: false,
            loadLatestPostsError: false
        }
    });

    const fullState = Immutable({
        filter: 'Health',
        searchTerm: 'diet',
        posts: {
            currentPost: 'jklm3n',
            trendingPosts: trendingPosts,
            latestPosts: latestPosts,
            loadingTrendingPosts: true,
            loadTrendingPostsError: true,
            loadingLatestPosts: true,
            loadLatestPostsError: true
        }
    });

    const fullState2 = Immutable({
        filter: 'Neuroscience',
        searchTerm: 'brain',
        posts: {
            currentPost: 'jklm3n',
            trendingPosts: trendingPosts,
            latestPosts: latestPosts,
            loadingTrendingPosts: true,
            loadTrendingPostsError: true,
            loadingLatestPosts: true,
            loadLatestPostsError: true
        }
    });

    describe('selectCurrentPost', () => {
        test('selects currentPost from posts slice of state', () => {
            expect(selectCurrentPost(emptyState)).toBe(null);
            expect(selectCurrentPost(fullState)).toBe('jklm3n');
        });
    });
    
    describe('selectTrendingPosts', () => {
        test('selects trendingPosts from posts slice of state', () => {
            expect(selectTrendingPosts(emptyState)).toEqual([]);
            expect(selectTrendingPosts(fullState)).toEqual(trendingPosts);
        });
    });
    
    describe('selectLoadingTrendingPosts', () => {
        test('selects loadingTrendingPosts from posts slice of state', () => {
            expect(selectLoadingTrendingPosts(emptyState)).toBe(false);
            expect(selectLoadingTrendingPosts(fullState)).toBe(true);
        });
    });
    
    describe('selectLoadTrendingPostsError', () => {
        test('selects loadTrendingPostsError from posts slice of state', () => {
            expect(selectLoadTrendingPostsError(emptyState)).toBe(false);
            expect(selectLoadTrendingPostsError(fullState)).toBe(true);
        });
    });
    
    describe('selectLatestPosts', () => {
        test('selects latestPosts from posts slice of state', () => {
            expect(selectLatestPosts(emptyState)).toEqual([]);
            expect(selectLatestPosts(fullState)).toEqual(latestPosts);
        });
    });
    
    describe('selectLoadingLatestPosts', () => {
        test('selects loadingLatestPosts from posts slice of state', () => {
            expect(selectLoadingLatestPosts(emptyState)).toBe(false);
            expect(selectLoadingLatestPosts(fullState)).toBe(true);
        });
    });
    
    describe('selectLoadLatestPostsError', () => {
        test('selects loadLatestPostsError from posts slice of state', () => {
            expect(selectLoadLatestPostsError(emptyState)).toBe(false);
            expect(selectLoadLatestPostsError(fullState)).toBe(true);
        });
    });
    
    describe('selectFilteredTrendingPosts', () => {
        test('selects filteredTrendingPosts from posts slice of state', () => {
            expect(selectFilteredTrendingPosts(emptyState2)).toEqual(trendingPosts);
            expect(selectFilteredTrendingPosts(fullState)).toEqual([{
                id: 'jklm3n',
                title: 'An Overview of Traditional Diets Versus Modern Diets',
                author: 'ScienceLover',
                created: 1619652318,
                flair: 'Health',
                thumbnail: 'https://source.unsplash.com/140x140/?health',
                commentNum: 6,
                url: 'https://www.nutrition.org/'
            }]);
        });
    });
    
    describe('selectFilteredLatestPosts', () => {
        test('selects filteredLatestPosts from posts slice of state', () => {
            expect(selectFilteredLatestPosts(emptyState2)).toEqual(latestPosts);
            expect(selectFilteredLatestPosts(fullState2)).toEqual([{
                id: 'tuvw5x',
                title: 'Activation of the Brain in Subjects With High And Average Intelligence',
                author: 'ScienceObserver',
                created: 1619652318,
                flair: 'Neuroscience',
                thumbnail: 'https://source.unsplash.com/140x140/?neuroscience',
                commentNum: 3,
                url: 'https://www.jneurosci.org/'
            }]);
        });
    });
});