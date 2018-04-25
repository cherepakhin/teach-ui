import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as actions from '../ReportActions';
import { URL_SERVER, CONST_ACTION } from '../../constants';

let middlewares = [thunk];
let mockStore = configureMockStore(middlewares);


describe('ReportActions', () => {
  beforeEach(() => {
    middlewares = [thunk];
    mockStore = configureMockStore(middlewares);
  });

  it('buildReport', () => {
    const state = {
      report: [],
      params: {
        startDate: new Date().toISOString().slice(0, 10),
        endDate: new Date().toISOString().slice(0, 10),
        department: '',
      },
    };
    const store = mockStore({ ...state });
    const report = [
      {
        employee_name: 'NAME1',
      },
    ];
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    nock(URL_SERVER)
      .get('/report/employee_feature_group/')
      .query(true)
      .reply(200, [...report]);

    const nameReport = 'Отчет Сотрудники->Группы хар-к';
    return store.dispatch(actions.buildReport(nameReport, { year, month }))
      .then(() => {
        const actualActions = store.getActions();
        // console.log(actualActions);
        expect(actualActions[0]).toEqual({ type: CONST_ACTION.PROGRESS_SHOW });
        expect(actualActions[1]).toEqual({ type: CONST_ACTION.PROGRESS_HIDE });
        expect(actualActions[2].type).toEqual(CONST_ACTION.SET_REPORT);

        expect(actualActions[2].payload.data).toEqual(report);
        expect(actualActions[2].payload.params).toEqual({ year, month });
        expect(actualActions[2].payload.nameReport).toBe(nameReport);
      });
  });
});
