import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';

import { CONST_ACTION, URL_SERVER } from '../../constants';
import * as actions from '../SetupFeatureActions';

let middlewares = [thunk];
let mockStore = configureMockStore(middlewares);


describe('SetupFeatureActions', () => {
  beforeEach(() => {
    middlewares = [thunk];
    mockStore = configureMockStore(middlewares);
  });

  it('refresh', () => {
  });
});
