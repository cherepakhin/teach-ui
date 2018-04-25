import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import WebFontLoader from 'webfontloader';
import store from './store';
import App from './containers/app';

// import { ConnectedDocsForPrice } from './containers/dlg/SelectDocFromSearch/DocsForPrice';
// import { initialState } from './reducers/priceReducer';

import './index.css';

// initialState.docsForPrice.docs = require('./fixtures/docs.json');


WebFontLoader.load({
  google: {
    families: ['Roboto:300,400,500,700', 'Material Icons'],
  },
});

const target = document.querySelector('#root');

// <ConnectedDocsForPrice />

render(
  <Provider store={store}>
    <App />
  </Provider>,
  target,
);
