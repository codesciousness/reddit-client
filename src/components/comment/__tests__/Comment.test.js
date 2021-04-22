import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Comment from '../Comment';

describe('<Comment />', () => {
    test('Comment component is defined', () => {
        expect(<Comment />).toBeDefined();
    });
});