import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';

import Root from './containers/Root';
import configureStore from './redux/configureStore';

const store = configureStore();

ReactDOM.render(
  <Root store={store} />,
  document.getElementById("root")
);
