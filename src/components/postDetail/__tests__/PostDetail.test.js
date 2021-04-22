import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import PostDetail from '../PostDetail';

describe('<PostDetail />', () => {
    test('PostDetail component is defined', () => {
        expect(<PostDetail />).toBeDefined();
    });
});