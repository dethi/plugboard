import './bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import plugboardReducers from './reducers';

import App from './components/App';
import './css/app.scss';

const store = createStore(plugboardReducers);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
