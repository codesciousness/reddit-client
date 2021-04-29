//import { Reducer, Selector, Thunk } from 'redux-testkit';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Immutable from 'seamless-immutable';
import commentsReducer, { loadComments, selectComments, selectLoadingComments, selectLoadCommentsError } from '../commentsSlice';
global.fetch = require('jest-fetch-mock');

const mockStore = configureStore([thunk]);

const comments = [
    {
        id: 'abcd0e',
        author: 'ScienceReader',
        created: 1618386788,
        body: 'Very informative article!',
        ups: 10
    },
    {
        id: 'fghi1j',
        author: 'ScienceLearner',
        created: 1618391145,
        body: 'Future research on this topic should definitely move more in this direction.',
        ups: 1
    }
];

describe('commentsReducer', () => {
    const initialState = Immutable({
        comments: [],
        loadingComments: false,
        loadCommentsError: false
    });

    test('returns initial state when an empty or undefined action is dispatched', () => {
        expect(commentsReducer(undefined, {})).toEqual(initialState);
        expect(commentsReducer(undefined, {type: 'undefined'})).toEqual(initialState);
    });
    test('returns correct state when loadComments/pending action is dispatched', () => {
        expect(commentsReducer(initialState, {type: 'comments/loadComments/pending'})).toMatchSnapshot();
    });
    test('returns correct state when loadComments/fulfilled action is dispatched', () => {
        expect(commentsReducer(initialState, {type: 'comments/loadComments/fulfilled', payload: comments})).toMatchSnapshot();
    });
    test('returns correct state when loadComments/rejected action is dispatched', () => {
        expect(commentsReducer(initialState, {type: 'comments/loadComments/rejected'})).toMatchSnapshot();
    });
});

describe('Action Handler', () => {
    describe('loadComments', () => {
        let store;
    
        beforeEach(() => {
            store = mockStore({
                comments: {
                    comments: [],
                    loadingComments: false,
                    loadCommentsError: false
                }
            });
            fetch.resetMocks();
        });
    
        test('it should return comments from reddit when fetch is successful', async () => {
            const data = require('./test-data.json');
            fetch.mockResponse(JSON.stringify(data), { status: 200 });
            const returnFunc = await loadComments('jklm3n');
            await returnFunc(store.dispatch);
            const actions = store.getActions();
            const action1 = {type: actions[0].type};
            const action2 = {type: actions[1].type, payload: actions[1].payload};
            expect(actions).toHaveLength(2);
            expect(action1).toEqual({type: 'comments/loadComments/pending'});
            expect(action2).toEqual({type: 'comments/loadComments/fulfilled', payload: comments});
        });
        test('it should return error message when fetch is unsuccessful', async () => {
            fetch.mockResponse(JSON.stringify({}), { status: 500 });
            const returnFunc = await loadComments('jklm3n');
            await returnFunc(store.dispatch);
            const actions = store.getActions();
            const action1 = {type: actions[0].type};
            const action2 = {type: actions[1].type, payload: actions[1].payload, error: actions[1].error.message};
            expect(actions).toHaveLength(2);
            expect(action1).toEqual({type: 'comments/loadComments/pending'});
            expect(action2).toEqual({type: 'comments/loadComments/rejected', payload: undefined, error: "Cannot read property 'data' of undefined"});
        });
    });
});

describe('Selectors', () => {
    const emptyState = Immutable({
        comments: {
            comments: [],
            loadingComments: false,
            loadCommentsError: false
        }
    });

    const fullState = Immutable({
        comments: {
            comments: comments,
            loadingComments: true,
            loadCommentsError: true
        }
    });

    describe('selectComments', () => {
        test('selects comments slice of state', () => {
            expect(selectComments(emptyState)).toEqual([]);
            expect(selectComments(fullState)).toEqual(comments);
        });
    });
    
    describe('selectLoadingComments', () => {
        test('selects loadingComments from comments slice of state', () => {
            expect(selectLoadingComments(emptyState)).toBe(false);
            expect(selectLoadingComments(fullState)).toBe(true);
        });
    });
    
    describe('selectLoadCommentsError', () => {
        test('selects loadCommentsError from comments slice of state', () => {
            expect(selectLoadCommentsError(emptyState)).toBe(false);
            expect(selectLoadCommentsError(fullState)).toBe(true);
        });
    });
});