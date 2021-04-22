import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Home from '../Home';

describe('<Home />', () => {
    test('Home component is defined', () => {
        expect(<Home />).toBeDefined();
    });
});