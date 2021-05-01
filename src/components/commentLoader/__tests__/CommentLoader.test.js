import React from 'react';
import { render, screen } from '@testing-library/react';
import { create } from 'react-test-renderer';
import CommentLoader from '../CommentLoader';

describe('<CommentLoader />', () => {
    test('CommentLoader component is defined', () => {
        expect(<CommentLoader />).toBeDefined();
    });
    test('matches the snapshot', () => {
        const component = create(<CommentLoader />);
        expect(component.toJSON()).toMatchSnapshot();
    });
    test('renders correctly', () => {
        const { container } = render(<CommentLoader />);
        expect(container.querySelector('.CommentLoader')).toBeInTheDocument();
        expect(screen.getByText('Comment author')).toBeInTheDocument();
        expect(screen.getByText('Post time')).toBeInTheDocument();
        expect(screen.getByText('Comment body')).toBeInTheDocument();
        expect(screen.getByText('Ups#')).toBeInTheDocument();
    });
});