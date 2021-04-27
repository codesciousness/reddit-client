import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { create } from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import Posts from '../Posts';

const mockStore = configureStore([thunk]);

const trendingPosts = [
    {
        id: 'efgh2i',
        title: 'Where Can the Solar Eclipse be Viewed Next Week',
        author: 'ScienceResearcher',
        created: '4 hours ago',
        flair: 'Astronomy',
        thumbnail: 'https://source.unsplash.com/140x140/?astronomy',
        commentNum: 25,
        url: 'https://www.sciencemag.org/'
    },
    {
        id: 'jklm3n',
        title: 'An Overview of Traditional Diets versus Modern Diets',
        author: 'ScienceLover',
        created: '2 hours ago',
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
        created: '25 minutes ago',
        flair: 'Biology',
        thumbnail: 'https://source.unsplash.com/140x140/?biology',
        commentNum: 2,
        url: 'https://www.nature.com/'
    },
    {
        id: 'tuvw5x',
        title: 'Activation of the Brain in Subjects With High And Average Intelligence',
        author: 'ScienceObserver',
        created: '40 minutes ago',
        flair: 'Neuroscience',
        thumbnail: 'https://source.unsplash.com/140x140/?neuroscience',
        commentNum: 3,
        url: 'https://www.jneurosci.org/'
    }
];

describe('<Posts />', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            filter: '',
            searchTerm: '',
            posts: {
                trendingPosts,
                latestPosts,
                loadingTrendingPosts: false,
                loadTrendingPostsError: false,
                loadingLatestPosts: false,
                loadLatestPostsError: false,
            }
        });
    });

    test('Posts component is defined', () => {
        expect(<Posts />).toBeDefined();
    });
    test('matches the snapshot when isTrending=true prop is passed', () => {
        const component = create(
            <Provider store={store}>
                <Router>
                    <Posts isTrending={true} />
                </Router>
            </Provider>
        );
        expect(component.toJSON()).toMatchSnapshot();
    });
    test('matches the snapshot when isTrending=false prop is passed', () => {
        const component = create(
            <Provider store={store}>
                <Router>
                    <Posts isTrending={false} />
                </Router>
            </Provider>
        );
        expect(component.toJSON()).toMatchSnapshot();
    });
    test('renders correctly when isTrending=true prop is passed', () => {
        const { container } = render(
            <Provider store={store}>
                <Router>
                    <Posts isTrending={true} />
                </Router>
            </Provider>
        );
        expect(container.querySelector('.Posts__trending')).toBeInTheDocument();
    });
    test('renders correctly when isTrending=false prop is passed', () => {
        const { container } = render(
            <Provider store={store}>
                <Router>
                    <Posts isTrending={false} />
                </Router>
            </Provider>
        );
        expect(container.querySelector('.Posts__latest')).toBeInTheDocument();
    });
    test('renders and passes each trending post from state as a prop to a Post component', () => {
        render(
            <Provider store={store}>
                <Router>
                    <Posts isTrending={true} />
                </Router>
            </Provider>
        );
        expect(screen.getByText(/Where Can the Solar Eclipse be Viewed/)).toBeInTheDocument();
        expect(screen.getByText(/An Overview of Traditional Diets versus Modern/)).toBeInTheDocument();
    });
    test('renders and passes each latest post from state as a prop to a Post component', () => {
        render(
            <Provider store={store}>
                <Router>
                    <Posts isTrending={false} />
                </Router>
            </Provider>
        );
        expect(screen.getByText(/Causes of Reproductive Stress on Animals in Declining Habitats/)).toBeInTheDocument();
        expect(screen.getByText(/Activation of the Brain in Subjects With High And Average Intelligence/)).toBeInTheDocument();
    });
    test('dispatches async action creators on initial render', () => {
        render(
            <Provider store={store}>
                <Router>
                    <Posts isTrending={true} />
                </Router>
            </Provider>
        );
        const actions = store.getActions();
        const firstActionType = actions[0].type;
        const secondActionType = actions[1].type;
        const dispatched = [ firstActionType, secondActionType];
        const expected = ['posts/loadTrendingPosts/pending', 'posts/loadLatestPosts/pending'];
        expect(dispatched).toEqual(expected);
    });
    test('dispatches async action creators when filter changes', () => {
        render(
            <Provider store={store}>
                <Router>
                    <Posts isTrending={true} />
                </Router>
            </Provider>
        );
        let actions = store.getActions();
        expect(actions.length).toBe(2);
        store.filter = 'Health';
        render(
            <Provider store={store}>
                <Router>
                    <Posts isTrending={true} />
                </Router>
            </Provider>
        );
        actions = store.getActions();
        expect(actions.length).toBe(4);
        const firstActionType = actions[0].type;
        const secondActionType = actions[1].type;
        const thirdActionType = actions[2].type;
        const fourthActionType = actions[3].type;
        const dispatched = [ firstActionType, secondActionType, thirdActionType, fourthActionType];
        const expected = ['posts/loadTrendingPosts/pending', 'posts/loadLatestPosts/pending', 'posts/loadTrendingPosts/pending', 'posts/loadLatestPosts/pending'];
        expect(dispatched).toEqual(expected);
    });
    test('dispatches async action creators when searchTerm changes', () => {
        render(
            <Provider store={store}>
                <Router>
                    <Posts isTrending={true} />
                </Router>
            </Provider>
        );
        let actions = store.getActions();
        expect(actions.length).toBe(2);
        store.searchTerm = 'c';
        render(
            <Provider store={store}>
                <Router>
                    <Posts isTrending={true} />
                </Router>
            </Provider>
        );
        actions = store.getActions();
        expect(actions.length).toBe(4);
        const firstActionType = actions[0].type;
        const secondActionType = actions[1].type;
        const thirdActionType = actions[2].type;
        const fourthActionType = actions[3].type;
        const dispatched = [ firstActionType, secondActionType, thirdActionType, fourthActionType];
        const expected = ['posts/loadTrendingPosts/pending', 'posts/loadLatestPosts/pending', 'posts/loadTrendingPosts/pending', 'posts/loadLatestPosts/pending'];
        expect(dispatched).toEqual(expected);
    });
    test('renders a Loader component under trending posts when loadingTrendingPosts=true', () => {
        store = mockStore({
            filter: '',
            searchTerm: '',
            posts: {
                trendingPosts,
                latestPosts,
                loadingTrendingPosts: true,
                loadTrendingPostsError: false,
                loadingLatestPosts: false,
                loadLatestPostsError: false,
            }
        });
        const { container } = render(
            <Provider store={store}>
                <Router>
                    <Posts isTrending={true} />
                </Router>
            </Provider>
        );
        expect(container.querySelector('.Posts__trending')).toBeInTheDocument();
        expect(container.querySelector('.Loader')).toBeInTheDocument();
    });
    test('renders a Loader component under latest posts when loadingLatestPosts=true', () => {
        store = mockStore({
            filter: '',
            searchTerm: '',
            posts: {
                trendingPosts,
                latestPosts,
                loadingTrendingPosts: false,
                loadTrendingPostsError: false,
                loadingLatestPosts: true,
                loadLatestPostsError: false,
            }
        });
        const { container } = render(
            <Provider store={store}>
                <Router>
                    <Posts isTrending={false} />
                </Router>
            </Provider>
        );
        expect(container.querySelector('.Posts__latest')).toBeInTheDocument();
        expect(container.querySelector('.Loader')).toBeInTheDocument();
    });
    test('renders error message under trending posts when loadTrendingPostsError=true', () => {
        store = mockStore({
            filter: '',
            searchTerm: '',
            posts: {
                trendingPosts,
                latestPosts,
                loadingTrendingPosts: false,
                loadTrendingPostsError: true,
                loadingLatestPosts: false,
                loadLatestPostsError: false,
            }
        });
        const { container } = render(
            <Provider store={store}>
                <Router>
                    <Posts isTrending={true} />
                </Router>
            </Provider>
        );
        expect(container.querySelector('.Posts__trending')).toBeInTheDocument();
        expect(container.querySelector('.Posts__trending__error')).toBeInTheDocument();
        expect(screen.getByText(/Error: Request failed! Please try again./)).toBeInTheDocument();
    });
    test('renders error message under latest posts when loadLatestPostsError=true', () => {
        store = mockStore({
            filter: '',
            searchTerm: '',
            posts: {
                trendingPosts,
                latestPosts,
                loadingTrendingPosts: false,
                loadTrendingPostsError: false,
                loadingLatestPosts: false,
                loadLatestPostsError: true,
            }
        });
        const { container } = render(
            <Provider store={store}>
                <Router>
                    <Posts isTrending={false} />
                </Router>
            </Provider>
        );
        expect(container.querySelector('.Posts__latest')).toBeInTheDocument();
        expect(container.querySelector('.Posts__latest__error')).toBeInTheDocument();
        expect(screen.getByText(/Error: Request failed! Please try again./)).toBeInTheDocument();
    });
});