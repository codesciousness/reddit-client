import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Post from '../Post';

describe('<Post />', () => {
    test('Post component is defined', () => {
        expect(<Post />).toBeDefined();
    });
});