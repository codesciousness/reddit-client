import React from 'react';
import { render, screen } from '@testing-library/react';
import { create } from 'react-test-renderer';
import Comment from '../Comment';

const comment = {
    id: 'abcd1e',
    author: 'ScienceReader',
    created: '1 hour ago',
    body: 'Very informative article!',
    ups: 10
};

jest.mock('../../postTime/PostTime', () => () => (<span data-testid="PostTime">{comment.created}</span>));

describe('<Comment />', () => {
    test('Comment component is defined', () => {
        expect(<Comment />).toBeDefined();
    });
    test('matches the snapshot', () => {
        const component = create(<Comment comment={comment} />);
        expect(component.toJSON()).toMatchSnapshot();
    });
    test('renders correctly with props', () => {
        render(<Comment comment={comment} />);
        expect(screen.getByText('Very informative article!')).toBeInTheDocument();
        expect(screen.getByText('10 Ups')).toBeInTheDocument();
    });
    test('renders a PostTime component', () => {
        render(<Comment comment={comment} />);
        expect(screen.getByTestId('PostTime')).toBeInTheDocument();
    });
});