import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { create } from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import Comments from '../Comments';

const mockStore = configureStore([thunk]);

const comments = [
    {
        id: 'abcd0e',
        author: 'ScienceReader',
        created: '1 hour ago',
        body: 'Very informative article!',
        ups: 10
    },
    {
        id: 'fghi1j',
        author: 'ScienceLearner',
        created: '15 minutes ago',
        body: 'Future research on this topic should definitely move more in this direction.',
        ups: 1
    }
];

describe('<Comments />', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            posts: {
                currentPost: 'jklm3n'
            },
            comments: {
                comments,
                loadingComments: false,
                loadCommentsError: false
            }
        });
    });

    test('Comments component is defined', () => {
        expect(<Comments />).toBeDefined();
    });
    test('matches the snapshot', () => {
        const component = create(
            <Provider store={store}>
                <Router>
                    <Comments />
                </Router>
            </Provider>
        );
        expect(component.toJSON()).toMatchSnapshot();
    });
    test('renders correctly', () => {
        render(
            <Provider store={store}>
                <Router>
                    <Comments />
                </Router>
            </Provider>
        );
        expect(screen.getByText('Comments')).toBeInTheDocument();
    });
    test('renders and passes each comment from state as a prop to a Comment component', () => {
        render(
            <Provider store={store}>
                <Router>
                    <Comments />
                </Router>
            </Provider>
        );
        expect(screen.getByText(/Very informative article/)).toBeInTheDocument();
        expect(screen.getByText(/ScienceLearner/)).toBeInTheDocument();
    });
    test('dispatches correct payload to async action creator when currentPost is truthy', () => {
        render(
            <Provider store={store}>
                <Router>
                    <Comments />
                </Router>
            </Provider>
        );
        const actions = store.getActions();
        const dispatchedPayload = actions[0].meta.arg;
        const expectedPayload = 'jklm3n';
        expect(dispatchedPayload).toBe(expectedPayload);
    });
    test('renders 2 CommentLoader components when loadingComments=true', () => {
        store = mockStore({
            posts: {
                currentPost: 'jklm3n'
            },
            comments: {
                comments,
                loadingComments: true,
                loadCommentsError: false
            }
        });
        const { container } = render(
            <Provider store={store}>
                <Router>
                    <Comments />
                </Router>
            </Provider>
        );
        expect(container.querySelectorAll('.CommentLoader')).toHaveLength(2);
    });
    test('renders error message when loadCommentsError=true', () => {
        store = mockStore({
            posts: {
                currentPost: 'jklm3n'
            },
            comments: {
                comments,
                loadingComments: false,
                loadCommentsError: true
            }
        });
        const { container } = render(
            <Provider store={store}>
                <Router>
                    <Comments />
                </Router>
            </Provider>
        );
        expect(container.querySelector('.Comments__error')).toBeInTheDocument();
        expect(container.querySelector('.Comments__link')).toBeInTheDocument();
        expect(screen.getByText(/Error: Request failed! Please try again./)).toBeInTheDocument();
    });
});