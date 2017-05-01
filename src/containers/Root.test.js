import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import Root from './Root';
import configureStore from '../redux/configureStore';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Root store={configureStore()} />, div);
});
