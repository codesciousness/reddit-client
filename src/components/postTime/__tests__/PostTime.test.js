import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import PostTime from '../PostTime';

describe('<PostTime />', () => {
    test('PostTime component is defined', () => {
        expect(<PostTime />).toBeDefined();
    });
});