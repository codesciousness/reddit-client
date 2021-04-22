import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Loader from '../Loader';

describe('<Loader />', () => {
    test('Loader component is defined', () => {
        expect(<Loader />).toBeDefined();
    });
});