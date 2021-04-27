import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { create } from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import Filter from '../Filter';

const flair = 'Chemistry';

const mockStore = configureStore([]);

describe('<Filter />', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            filter: ''
        });
    });

    test('Filter component is defined', () => {
        expect(<Filter />).toBeDefined();
    });
    test('matches the snapshot', () => {
        const component = create(
            <Provider store={store}>
                <Filter flair={flair} />
            </Provider>
        );
        expect(component.toJSON()).toMatchSnapshot();
    });
    test('renders inactive button correctly with props', () => {
        const { container } = render(
            <Provider store={store}>
                <Filter flair={flair} />
            </Provider>
        );
        expect(container.getElementsByClassName('Filter__button')[0]).toBeInTheDocument();
        expect(screen.getByText('Chemistry')).toBeInTheDocument();
    });
    test('renders active button correctly with props', () => {
        store = mockStore({
            filter: 'Chemistry'
        });
        const { container } = render(
            <Provider store={store}>
                <Filter flair={flair} />
            </Provider>
        );
        expect(container.getElementsByClassName('Filter__button__active')[0]).toBeInTheDocument();
        expect(screen.getByText('Chemistry')).toBeInTheDocument();
    });
    test('dispatches correct action when inactive filter button is clicked', () => {
        render(
            <Provider store={store}>
                <Filter flair={flair} />
            </Provider>
        );
        const button = screen.getByText('Chemistry');
        userEvent.click(button);
        const actions = store.getActions();
        const expectedPayload = {type: 'filter/setFilter', payload: 'Chemistry'};
        expect(actions).toEqual([expectedPayload]);
    });
    test('dispatches correct action when active filter button is clicked', () => {
        store = mockStore({
            filter: 'Chemistry'
        });
        render(
            <Provider store={store}>
                <Filter flair={flair} />
            </Provider>
        );
        const button = screen.getByText('Chemistry');
        userEvent.click(button);
        const actions = store.getActions();
        const expectedAction = {type: 'filter/clearFilter'};
        expect(actions).toEqual([expectedAction]);
    });
});