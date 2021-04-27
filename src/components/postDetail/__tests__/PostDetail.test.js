import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { create } from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import PostDetail from '../PostDetail';

jest.mock('../../../features/comments/Comments', () => () => {
    return (
        <div data-testid="Comments">
            <p>Comments</p>
            <p>Very informative article! | Posted By: ScienceReader</p>
            <p>Future research on this topic should definitely move more in this direction. | Posted By: ScienceLearner</p>
        </div>
    );
});

const mockStore = configureStore([]);

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

describe('<PostDetail />', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            posts: {
                currentPost: 'jklm3n',
                trendingPosts,
                latestPosts
            }
        });
    });

    test('PostDetail component is defined', () => {
        expect(<PostDetail />).toBeDefined();
    });
    test('matches the snapshot', () => {
        const component = create(
            <Provider store={store}>
                <Router>
                    <PostDetail />
                </Router>
            </Provider>
        );
        expect(component.toJSON()).toMatchSnapshot();
    });
    test('renders correctly when currentPost is truthy', () => {
        const { container } = render(
            <Provider store={store}>
                <Router>
                    <PostDetail />
                </Router>
            </Provider>
        );
        expect(container.querySelector('.PostDetail')).toBeInTheDocument();
    });
    test('returns null when currentPost is falsy', () => {
        store = mockStore({
            posts: {
                currentPost: '',
                trendingPosts,
                latestPosts
            }
        });
        const { container } = render(
            <Provider store={store}>
                <Router>
                    <PostDetail />
                </Router>
            </Provider>
        );
        expect(container.querySelector('.PostDetail')).toBeNull();
    });
    test('renders a Post component with isTrending=false prop passed', () => {
        const { container } = render(
            <Provider store={store}>
                <Router>
                    <PostDetail />
                </Router>
            </Provider>
        );
        expect(container.querySelector('.Post__latest')).toBeInTheDocument();
        expect(screen.getByText('An Overview of Traditional Diets versus Modern Diets')).toBeInTheDocument();
        expect(screen.getByText('ScienceLover')).toBeInTheDocument();
        expect(screen.getByText('Health')).toBeInTheDocument();
    });
    test('renders a Comments component', () => {
        render(
            <Provider store={store}>
                <Router>
                    <PostDetail />
                </Router>
            </Provider>
        );
        expect(screen.getByTestId('Comments')).toBeInTheDocument();
        expect(screen.getByText(/Very informative article/)).toBeInTheDocument();
        expect(screen.getByText(/ScienceLearner/)).toBeInTheDocument();
    });
});