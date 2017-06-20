import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import axios from 'axios';

import plugboardReducers from './reducers';

import App from './components/App';
import Index from './components/Index';
import Contact from './components/Contact';
import './css/app.scss';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const store = createStore(
  plugboardReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
  const state = store.getState();
  axios.defaults.headers.common['X-Auth'] = state.user !== null
    ? state.user.api_token
    : null;
});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route exact={true} path="/" component={Index} />
        <Route path="/app" component={App} />
        <Route path="/contact" component={Contact} />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
