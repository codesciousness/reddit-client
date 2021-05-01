import React from 'react';
import { render, screen } from '@testing-library/react';
import { create } from 'react-test-renderer';
import PostLoader from '../PostLoader';

describe('<PostLoader />', () => {
    test('PostLoader component is defined', () => {
        expect(<PostLoader />).toBeDefined();
    });
    test('matches the trending post loader snapshot', () => {
        const component = create(<PostLoader isTrending={true} />);
        expect(component.toJSON()).toMatchSnapshot();
    });
    test('matches the latest post loader snapshot', () => {
        const component = create(<PostLoader isTrending={false} />);
        expect(component.toJSON()).toMatchSnapshot();
    });
    test('renders correctly when isTrending=true prop is passed', () => {
        const { container } = render(<PostLoader isTrending={true} />);
        expect(container.querySelector('.PostLoader__trending')).toBeInTheDocument();
        expect(screen.getByText('Post flair name')).toBeInTheDocument();
        expect(screen.getByText('Short title of the article...')).toBeInTheDocument();
        expect(screen.queryByText('Read more')).not.toBeInTheDocument();
        expect(screen.queryByText('Post author')).not.toBeInTheDocument();
        expect(screen.queryByText('Post time')).not.toBeInTheDocument();
    });
    test('renders correctly when isTrending=false prop is passed', () => {
        const { container } = render(<PostLoader isTrending={false} />);
        expect(container.querySelector('.PostLoader__latest')).toBeInTheDocument();
        expect(screen.getByText('Post flair name')).toBeInTheDocument();
        expect(screen.getByText('Complete title of the article')).toBeInTheDocument();
        expect(screen.getByText('Read more')).toBeInTheDocument();
        expect(screen.getByText('Post author')).toBeInTheDocument();
        expect(screen.getByText('Post time')).toBeInTheDocument();
        expect(screen.getByText('Comment#')).toBeInTheDocument();
    });
});