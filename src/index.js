import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";

import App from './App';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import configureStore from './store/store';


const store = configureStore();
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
