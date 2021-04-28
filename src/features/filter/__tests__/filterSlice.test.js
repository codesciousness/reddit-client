import { Reducer, Selector } from 'redux-testkit';
import configureStore from 'redux-mock-store';
import Immutable from 'seamless-immutable';
import filterReducer, { setFilter, clearFilter, selectFilter } from '../filterSlice';

const initialState = '';

const mockStore = configureStore([]);

describe('filterReducer', () => {
    test('returns initial state when an empty or undefined action is dispatched', () => {
        expect(filterReducer(undefined, {})).toEqual(initialState);
        expect(filterReducer(undefined, {type: 'undefined'})).toEqual(initialState);
    });
});

describe('setFilter', () => {
    test('', () => {
        
    });
});

describe('clearFilter', () => {
    test('', () => {
        
    });
});

describe('selectFilter', () => {
    test('', () => {
        
    });
});