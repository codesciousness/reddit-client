import React from 'react';
import { render, screen } from '@testing-library/react';
import { create } from 'react-test-renderer';
import Home from '../Home';

jest.mock('../../../features/searchTerm/SearchTerm', () => () => (<form data-testid="SearchTerm"><input placeholder="Test Search..."/></form>));
jest.mock('../../../features/posts/Posts', () => ({ isTrending }) => {
    if(isTrending){
        return <section data-testid="Posts__trending">Test Trending Posts</section>
    }
    else {
        return <section data-testid="Posts__latest">Test Latest Posts</section>
    }
});

describe('<Home />', () => {
    test('Home component is defined', () => {
        expect(<Home />).toBeDefined();
    });
    test('matches the snapshot', () => {
        const component = create(<Home />);
        expect(component.toJSON()).toMatchSnapshot();
    });
    test('renders correctly', () => {
        render(<Home />);
        expect(screen.getByText('Trending')).toBeInTheDocument();
        expect(screen.getByText('Latest')).toBeInTheDocument();
    });
    test('renders a SearchTerm component', () => {
        render(<Home />);
        expect(screen.getByTestId('SearchTerm')).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Test Search/)).toBeInTheDocument();
    });
    test('renders 2 Posts components', () => {
        render(<Home />);
        expect(screen.getAllByText(/Posts/)).toHaveLength(2);
    });
    test('passes correct props to subcomponents', () => {
        render(<Home />);
        expect(screen.getByTestId('Posts__trending')).toBeInTheDocument();
        expect(screen.getByTestId('Posts__latest')).toBeInTheDocument();
    });
});