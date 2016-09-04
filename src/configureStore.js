import { createStore } from 'redux';
import rootReducer from './reducers';

const configureStore = () => {
  return createStore(rootReducer, window.devToolsExtension && window.devToolsExtension());
};

export default configureStore;
