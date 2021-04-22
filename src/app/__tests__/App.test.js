import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { create } from 'react-test-renderer';
import store from '../store';
import App from '../App';

describe('<App />', () => {
  test('App component is defined', () => {
    expect(<App />).toBeDefined();
  });
  test('renders correctly with initial state from Redux store', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(screen.getByText('Reddit Science')).toBeInTheDocument();
  });
  test('matches the snapshot', () => {
    const component = create(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});