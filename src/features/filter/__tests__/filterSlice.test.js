//import { Reducer, Selector } from 'redux-testkit';
import configureStore from 'redux-mock-store';
import Immutable from 'seamless-immutable';
import filterReducer, { setFilter, clearFilter, selectFilter } from '../filterSlice';

const mockStore = configureStore([]);

describe('filterReducer', () => {
    const initialState = '';
    const existingState = 'Pyschology';
    const nextState = 'Earth Science';

    test('returns initial state when an empty or undefined action is dispatched', () => {
        expect(filterReducer(undefined, {})).toEqual(initialState);
        expect(filterReducer(undefined, {type: 'undefined'})).toEqual(initialState);
    });
    test('returns correct state when setFilter action is dispatched', () => {
        expect(filterReducer(initialState, {type: 'filter/setFilter', payload: 'Pyschology'})).toEqual(existingState);
        expect(filterReducer(existingState, {type: 'filter/setFilter', payload: 'Earth Science'})).toEqual(nextState);
    });
    test('returns correct state when clearFilter action is dispatched', () => {
        expect(filterReducer(existingState, {type: 'filter/clearFilter'})).toEqual(initialState);
        expect(filterReducer(nextState, {type: 'filter/clearFilter'})).toEqual(initialState);
    });
});

describe('Action Handlers', () => {
    let store;
    
    beforeEach(() => {
        store = mockStore({
            filter: ''
        });
    });

    describe('setFilter', () => {
        test('generates the correct action to set the filter with initial state', () => {
            store.dispatch(setFilter('Biology'));
            const actions = store.getActions();
            const expectedAction = {type: 'filter/setFilter', payload: 'Biology'};
            expect(actions).toEqual([expectedAction]);
        });
        test('generates the correct action to set the filter with existing state', () => {
            store = mockStore({
                filter: 'Physics'
            });
            store.dispatch(setFilter('Biology'));
            const actions = store.getActions();
            const expectedAction = {type: 'filter/setFilter', payload: 'Biology'};
            expect(actions).toEqual([expectedAction]);
        });
    });
    
    describe('clearFilter', () => {
        test('generates the correct action to clear the filter', () => {
            store = mockStore({
                filter: 'Physics'
            });
            store.dispatch(clearFilter());
            const actions = store.getActions();
            const expectedAction = {type: 'filter/clearFilter'};
            expect(actions).toEqual([expectedAction]);
        });
    });
});

describe('Selector', () => {
    const emptyState = Immutable({
        filter: ''
    });
    const fullState = Immutable({
        filter: 'Medicine'
    });

    describe('selectFilter', () => {
        test('selects filter slice of state', () => {
            expect(selectFilter(emptyState)).toEqual('');
            expect(selectFilter(fullState)).toEqual('Medicine');
        });
    });
});