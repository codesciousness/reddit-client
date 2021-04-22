import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import FilterList from '../FilterList';

describe('<FilterList />', () => {
    test('FilterList component is defined', () => {
        expect(<FilterList />).toBeDefined();
    });
});