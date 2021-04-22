import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Posts from '../Posts';

describe('<Posts />', () => {
    test('Posts component is defined', () => {
        expect(<Posts />).toBeDefined();
    });
});