import { createStore } from 'redux';
import rootReducer from './reducers';

export default function configureStore() {
  return createStore(
    // eslint-disable-next-line no-underscore-dangle
    rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__
    // eslint-disable-next-line no-underscore-dangle
    && window.__REDUX_DEVTOOLS_EXTENSION__(),
  );
}
