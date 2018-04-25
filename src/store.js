import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import createLogger from 'redux-logger';
import rootReducer from './redusers/rootReducer';

export const history = createHistory();

// const logger = createLogger();
const initalState = {};
const enhancers = [];
const middleware = [
  routerMiddleware(history),
  thunk,
  createLogger,
];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware), ...enhancers);

const store = createStore(rootReducer, initalState, composedEnhancers);
export default store;
