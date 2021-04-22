import React from 'react';
import { render, screen } from '@testing-library/react';
import { create } from 'react-test-renderer';
import FilterList from '../FilterList';

jest.mock('../../../features/filter/Filter', () => () => (<button>Test Filter</button>));

describe('<FilterList />', () => {
    test('FilterList component is defined', () => {
        expect(<FilterList />).toBeDefined();
    });
    test('matches the snapshot', () => {
        const component = create(<FilterList />);
        expect(component.toJSON()).toMatchSnapshot();
    });
    test('renders correctly', () => {
        render(<FilterList />);
        expect(screen.getByText('Your Daily Dose of Science')).toBeInTheDocument();
        expect(screen.getByText('What interests you?')).toBeInTheDocument();
    });
    test('renders 22 Filter components', () => {
        render(<FilterList />);
        expect(screen.getAllByText('Test Filter')).toHaveLength(22);
    });
});