import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Filter from '../Filter';

describe('<Filter />', () => {
    test('Filter component is defined', () => {
        expect(<Filter />).toBeDefined();
    });
});