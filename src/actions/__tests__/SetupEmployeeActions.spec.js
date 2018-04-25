import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';

import { CONST_ACTION, URL_SERVER } from '../../constants';
import * as actions from '../SetupEmployeeActions';
import employees from '../../fixtures/employees.json';

let middlewares = [thunk];
let mockStore = configureMockStore(middlewares);


describe('SetupEmployeeActions', () => {
  beforeEach(() => {
    middlewares = [thunk];
    mockStore = configureMockStore(middlewares);
  });

  it('refresh', () => {
    const state = {
      setupEmployee: {
        employees: [],
      },
    };
    const store = mockStore({ ...state });

    nock(URL_SERVER)
      .get('/employee/')
      .query(true)
      .reply(200, [...employees]);

    return store.dispatch(actions.refresh())
      .then(() => {
        const actualActions = store.getActions();
        expect(actualActions[0].type).toEqual(CONST_ACTION.INIT_VAR);
        expect(actualActions[0].payload.employees).toEqual(employees);
      });
  });

  it('remove', () => {
    const state = {
      setupEmployee: {
        employees: [],
      },
    };
    const store = mockStore({ ...state });

    let refreshAction = false;
    nock(URL_SERVER)
      .get('/employee/')
      .query(() => {
        refreshAction = true;
        return true;
      })
      .reply(200, [...employees]);

    let deleteAction = false;
    nock(URL_SERVER)
      .delete('/employee/2/')
      .query(() => {
        deleteAction = true;
        return true;
      })
      .reply(200, {});

    return store.dispatch(actions.remove({ n: 2 }))
      .then(() => {
        expect(deleteAction).toBe(true);
        expect(refreshAction).toBe(true);
      });
  });

  it('save', () => {
    const state = {
      setupEmployee: {
        employees: [],
      },
    };
    const store = mockStore({ ...state });

    let refreshAction = false;
    nock(URL_SERVER)
      .get('/employee/')
      .query(() => {
        refreshAction = true;
        return true;
      })
      .reply(200, [...employees]);

    let actualBody = {};
    nock(URL_SERVER)
      .post('/employee/2/', (body) => {
        actualBody = body;
        return true;
      })
      .reply(200, {});

    return store.dispatch(actions.save({ n: 2, name: 'NEW_NAME' }))
      .then(() => {
        expect(actualBody).toEqual({ n: 2, name: 'NEW_NAME' });
        expect(refreshAction).toBe(true);
      });
  });

  it('create', () => {
    const state = {
      setupEmployee: {
        employees: [],
      },
    };
    const store = mockStore({ ...state });

    let refreshAction = false;
    nock(URL_SERVER)
      .get('/employee/')
      .query(() => {
        refreshAction = true;
        return true;
      })
      .reply(200, [...employees]);

    let actualBody = {};
    nock(URL_SERVER)
      .post('/employee/', (body) => {
        actualBody = body;
        return true;
      })
      .reply(200, {});

    return store.dispatch(actions.create({ n: 2, name: 'NEW_NAME' }))
      .then(() => {
        expect(actualBody).toEqual({ n: 2, name: 'NEW_NAME' });
        expect(refreshAction).toBe(true);
      });
  });
});
