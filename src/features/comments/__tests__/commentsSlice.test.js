import { Reducer, Selector, Thunk } from 'redux-testkit';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Immutable from 'seamless-immutable';
import commentsReducer, { loadComments, selectComments, selectLoadingComments, selectLoadCommentsError } from '../commentsSlice';
global.fetch = require('jest-fetch-mock');

const initialState = Immutable({
    comments: [],
    loadingComments: false,
    loadCommentsError: false
});

const mockStore = configureStore([thunk]);

describe('commentsReducer', () => {
    test('returns initial state when an empty or undefined action is dispatched', () => {
        expect(commentsReducer(undefined, {})).toEqual(initialState);
        expect(commentsReducer(undefined, {type: 'undefined'})).toEqual(initialState);
    });
});

describe('loadComments', () => {
    test('', () => {
        
    });
});

describe('selectComments', () => {
    test('', () => {
        
    });
});

describe('selectLoadingComments', () => {
    test('', () => {
        
    });
});

describe('selectLoadCommentsError', () => {
    test('', () => {
        
    });
});