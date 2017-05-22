import './bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { Route, IndexRoute } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import plugboardReducers from './reducers';

import App from './components/App';
import Index from './views/Index';
import Contact from './views/Contact';
import './css/app.scss';

const store = createStore(plugboardReducers);

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
