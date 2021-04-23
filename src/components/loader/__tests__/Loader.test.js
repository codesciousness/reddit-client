import React from 'react';
import { render, screen } from '@testing-library/react';
import { create } from 'react-test-renderer';
import Loader from '../Loader';

describe('<Loader />', () => {
    test('Loader component is defined', () => {
        expect(<Loader />).toBeDefined();
    });
    test('matches the snapshot', () => {
        const component = create(<Loader />);
        expect(component.toJSON()).toMatchSnapshot();
    });
    test('renders correctly', () => {
        const { container } = render(<Loader />);
        expect(container.querySelector('.Loader')).toBeInTheDocument();
    });
});