import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import SearchTerm from '../SearchTerm';

describe('<SearchTerm />', () => {
    test('SearchTerm component is defined', () => {
        expect(<SearchTerm />).toBeDefined();
    });
});