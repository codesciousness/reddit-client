import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { create } from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import Post from '../Post';

const post = {
    id: 'efgh2i',
    title: 'Where Can the Solar Eclipse be Viewed Next Week',
    author: 'ScienceResearcher',
    created: '30 minutes ago',
    flair: 'Astronomy',
    thumbnail: 'https://source.unsplash.com/140x140/?astronomy',
    commentNum: 25,
    url: 'https://www.sciencemag.org/'
};

jest.mock('../../postTime/PostTime');

const mockStore = configureStore([]);

describe('<Post />', () => {
    let store;

    beforeEach(() => {
        store = mockStore({});
        //Jest Spy Method: store.dispatch = jest.fn();
    });

    test('Post component is defined', () => {
        expect(<Post />).toBeDefined();
    });
    test('matches the trending post snapshot', () => {
        const component = create(
            <Provider store={store}>
                <Router>
                    <Post post={post} isTrending={true} />
                </Router>
            </Provider>
        );
        expect(component.toJSON()).toMatchSnapshot();
    });
    test('matches the latest post snapshot', () => {
        const component = create(
            <Provider store={store}>
                <Router>
                    <Post post={post} isTrending={false} />
                </Router>
            </Provider>
        );
        expect(component.toJSON()).toMatchSnapshot();
    });
    test('renders correctly when isTrending=true prop is passed', () => {
        const { container } = render(
            <Provider store={store}>
                <Router>
                    <Post post={post} isTrending={true} />
                </Router>
            </Provider>
        );
        const title = container.querySelector('.Post__trending__title').textContent;
        const linkComponent = container.querySelector('.Post__trending__link');
        const titleLength = title.split(' ').length
        expect(titleLength).toBeLessThanOrEqual(7);
        expect(screen.getByText('Astronomy')).toBeInTheDocument();
        expect(linkComponent).toBeInTheDocument();
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
        expect(screen.queryByText('ScienceResearcher')).not.toBeInTheDocument();
        expect(screen.queryByTestId('PostTime')).not.toBeInTheDocument();
    });
    test('renders correctly when isTrending=false prop is passed', () => {
        const { container } = render(
            <Provider store={store}>
                <Router>
                    <Post post={post} isTrending={false} />
                </Router>
            </Provider>
        );
        const title = container.querySelector('.Post__latest__title');
        const linkComponent = container.querySelector('.Post__latest__link')
        expect(title).toBeInTheDocument();
        expect(screen.getByText('Astronomy')).toBeInTheDocument();
        expect(linkComponent).toBeInTheDocument();
        expect(screen.getByRole('button')).toBeInTheDocument();
        expect(screen.getByText('ScienceResearcher')).toBeInTheDocument();
        expect(screen.getByTestId('PostTime')).toBeInTheDocument();
    });
    test('dispatches correct action when trending post title is clicked', () => {
        const { container } = render(
            <Provider store={store}>
                <Router>
                    <Post post={post} isTrending={true} />
                </Router>
            </Provider>
        );
        const title = container.querySelector('.Post__trending__title');
        userEvent.click(title);
        const actions = store.getActions();
        const expectedPayload = {type: 'posts/setCurrentPost', payload: 'efgh2i'};
        expect(actions).toEqual([expectedPayload]);
        /* Jest Spy Method:
        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith({type: 'posts/setCurrentPost', payload: 'efgh2i'});
        */
    });
    test('dispatches correct action when latest post title is clicked', () => {
        const { container } = render(
            <Provider store={store}>
                <Router>
                    <Post post={post} isTrending={false} />
                </Router>
            </Provider>
        );
        const title = container.querySelector('.Post__latest__title');
        userEvent.click(title);
        const actions = store.getActions();
        const expectedPayload = {type: 'posts/setCurrentPost', payload: 'efgh2i'};
        expect(actions).toEqual([expectedPayload]);
        /* Jest Spy Method:
        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith({type: 'posts/setCurrentPost', payload: 'efgh2i'});
        */
    });
});