import React from 'react';
import ReactDOM from 'react-dom';
import generateStore from './redux/store';
import { Provider } from 'react-redux';
import App from './App.jsx';
import * as serviceWorkerRegistration from './serviceWorker';
import reportWebVitals from './reportWebVitals';

const store = generateStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();

reportWebVitals();
