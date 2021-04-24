import React from 'react';
import { render, screen } from '@testing-library/react';
import PostTime from '../PostTime';

const time = 1619248621;

describe('<PostTime />', () => {
    test('PostTime component is defined', () => {
        expect(<PostTime />).toBeDefined();
    });
    test('renders correctly with time prop passed', () => {
        const { container } = render(<PostTime time={time} />);
        expect(container.querySelector('.PostTime')).toBeInTheDocument();
        expect(screen.getByText(/ago/)).toBeInTheDocument();
    });
});