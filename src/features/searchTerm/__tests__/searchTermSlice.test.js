import { Reducer, Selector } from 'redux-testkit';
import configureStore from 'redux-mock-store';
import Immutable from 'seamless-immutable';
import searchTermReducer, { setSearchTerm, clearSearchTerm, selectSearchTerm } from '../searchTermSlice';

const initialState = '';

const mockStore = configureStore([]);

describe('searchTermReducer', () => {
    test('returns initial state when an empty or undefined action is dispatched', () => {
        expect(searchTermReducer(undefined, {})).toEqual(initialState);
        expect(searchTermReducer(undefined, {type: 'undefined'})).toEqual(initialState);
    });
});

describe('setSearchTerm', () => {
    test('', () => {
        
    });
});

describe('clearSearchTerm', () => {
    test('', () => {
        
    });
});

describe('selectSearchTerm', () => {
    test('', () => {
        
    });
});