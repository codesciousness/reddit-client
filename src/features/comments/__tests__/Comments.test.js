import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Comments from '../Comments';

describe('<Comments />', () => {
    test('Comments component is defined', () => {
        expect(<Comments />).toBeDefined();
    });
});