import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';

import { CONST_ACTION, URL_SERVER } from '../../constants';
import * as actions from '../SetupFeatureGroupActions';
import feature_groups from '../../fixtures/feature_groups.json';

let middlewares = [thunk];
let mockStore = configureMockStore(middlewares);


describe('SetupFeatureGroupActions', () => {
  beforeEach(() => {
    middlewares = [thunk];
    mockStore = configureMockStore(middlewares);
  });

  it('refresh', () => {
    const state = {
      featureGroup: {
        featureGroups: [],
      },
    };
    const store = mockStore({ ...state });

    nock(URL_SERVER)
      .get('/feature_group/root/')
      .query(true)
      .reply(200, [...feature_groups]);

    return store.dispatch(actions.refresh())
      .then(() => {
        const actualActions = store.getActions();
        expect(actualActions[0].type).toEqual(CONST_ACTION.REFRESH_FEATURE_GROUPS);
        expect(actualActions[0].payload).toEqual(feature_groups);
      });
  });

  it('create', () => {
    const state = {
      featureGroup: {
        featureGroups: [],
      },
    };
    const store = mockStore({ ...state });
    const newFeatureGroup = {
      n: 1,
      name: 'NEW_NAME',
      parent_n: -1,
    };
    let params = {};
    nock(URL_SERVER)
      .post('/feature_group/', (body) => {
        // console.log(body);
        params = body;
        return true;
      })
      .reply(200, { ...newFeatureGroup });

    return store.dispatch(actions.create(newFeatureGroup))
      .then(() => {
        const actualActions = store.getActions();
        expect(actualActions[0].type).toEqual(CONST_ACTION.REFRESH_FEATURE_GROUP);
        expect(actualActions[0].payload).toEqual(newFeatureGroup);
        expect(params).toEqual(newFeatureGroup);
      });
  });

  it('remove', () => {
    const featureGroup = {
      n: 1,
      name: 'NEW_NAME',
      parent_n: -1,
    };
    const state = {
      featureGroup: {
        featureGroups: [featureGroup],
      },
    };
    let isDeleteReq = false;
    const store = mockStore({ ...state });
    nock(URL_SERVER)
      .delete(`/feature_group/${featureGroup.n}/?`, () => {
        // console.log('remove');
        isDeleteReq = true;
        return true;
      })
      .reply(200, {});

    nock(URL_SERVER)
      .get('/feature_group/root/')
      .query(true)
      .reply(200, []);

    return store.dispatch(actions.remove(featureGroup.n))
      .then(() => {
        const actualActions = store.getActions();
        // console.log(store.getState());
        // console.log(actualActions);
        expect(isDeleteReq).toBe(true);
        expect(actualActions[0].type).toEqual(CONST_ACTION.REFRESH_FEATURE_GROUPS);
        expect(actualActions[0].payload).toEqual([]);
      });
  });

  it('save', () => {
    const store = mockStore();
    const changedFeatureGroup = {
      n: 1,
      name: 'NEW_NAME',
      parent_n: -1,
    };
    let params = {};
    nock(URL_SERVER)
      .post(`/feature_group/${changedFeatureGroup.n}/`, (body) => {
        // console.log(body);
        params = body;
        return true;
      })
      .reply(200, { ...changedFeatureGroup });

    return store.dispatch(actions.save(changedFeatureGroup))
      .then(() => {
        const actualActions = store.getActions();
        expect(actualActions[0].type).toEqual(CONST_ACTION.REFRESH_FEATURE_GROUP);
        expect(actualActions[0].payload).toEqual(changedFeatureGroup);
        expect(params).toEqual(changedFeatureGroup);
      });
  });

  it('save for create', () => {
    const store = mockStore();
    const changedFeatureGroup = {
      n: -1,
      name: 'NEW_NAME',
      parent_n: -1,
    };
    let params = {};
    nock(URL_SERVER)
      .post('/feature_group/', (body) => {
        // console.log(body);
        params = body;
        return true;
      })
      .reply(200, { ...changedFeatureGroup });

    return store.dispatch(actions.save(changedFeatureGroup))
      .then(() => {
        const actualActions = store.getActions();
        // console.log(actualActions);
        expect(actualActions[0].type).toEqual(CONST_ACTION.REFRESH_FEATURE_GROUP);
        expect(actualActions[0].payload).toEqual(changedFeatureGroup);
        expect(params).toEqual(changedFeatureGroup);
      });
  });
});
