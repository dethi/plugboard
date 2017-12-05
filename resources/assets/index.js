import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import thunk from 'redux-thunk';

import axios from 'axios';

import plugboardReducers from './reducers';

import App from './components/App';
import ModalContainer from './components/modal/ModalContainer';
import Index from './components/home';
import Contact from './components/Contact';
import Profile from './components/profile/Profile';
import Community from './components/community/Community';
import './css/app.scss';

import UserAction from './actions/userActions';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const store = createStore(
  plugboardReducers,
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
  const state = store.getState();
  axios.defaults.headers.common['X-Auth'] = state.user !== null
    ? state.user.api_token
    : null;
});

store.dispatch(UserAction.init());

ReactDOM.render(
  <div>
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Route exact={true} path="/" component={Index} />
          <Route path="/app" component={App} />
          <Route path="/contact" component={Contact} />
          <Route path="/profile" component={Profile} />
          <Route path="/community" component={Community} />
          <ModalContainer />
        </div>
      </BrowserRouter>
    </Provider>
  </div>,
  document.getElementById('root')
);
