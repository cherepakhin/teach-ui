import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';

import { CONST_ACTION, URL_SERVER } from '../../constants';
import * as actions from '../PlanActions';
// import employees from '../../fixtures/employees.json';

let middlewares = [thunk];
let mockStore = configureMockStore(middlewares);


describe('PlanActions', () => {
  beforeEach(() => {
    middlewares = [thunk];
    mockStore = configureMockStore(middlewares);
  });

  it('refresh', () => {
    const state = {
      plan: {
        year: 2017,
        month: 12,
        plans: [],
      },
    };
    const store = mockStore({ ...state });

    const expectedPlans = [
      { n: 1 },
      { n: 2 },
    ];
    nock(URL_SERVER)
      .get('/plan/2017/12/')
      .query(true)
      .reply(200, [...expectedPlans]);

    return store.dispatch(actions.refresh())
      .then(() => {
        const actualActions = store.getActions();
        expect(actualActions[0].type).toEqual(CONST_ACTION.REFRESH_PLAN);
        expect(actualActions[0].payload.plans).toEqual(expectedPlans);
      });
  });

  it('change', () => {
    const state = {
      plan: {
        year: 2000,
        month: 1,
        plans: [],
      },
    };
    const store = mockStore({ ...state });
    store.dispatch(actions.change(2017, 1));
    const actualActions = store.getActions();
    expect(actualActions[0].type).toEqual(CONST_ACTION.CHANGE_PLAN);
    expect(actualActions[0].payload.year).toBe(2017);
    expect(actualActions[0].payload.month).toBe(1);
  });
});
