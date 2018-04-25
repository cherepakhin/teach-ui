import reportReducer from '../reportReducer';
import { CONST_ACTION } from '../../constants';

const defaultState = {
  report: {},
  activeReport: '',
};

describe('reportReducer', () => {
  it('default init', () => {
    expect(reportReducer(undefined, {}))
      .toEqual(defaultState);
  });

  it('action SET_REPORT. Получение отчета.', () => {
    const payload = {
      nameReport: 'Сводный отчет',
      data: [{
        employee_name: {
          n: 1,
        },
      }],
      params: {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
      },
    };
    const newState = reportReducer(undefined, { type: CONST_ACTION.SET_REPORT, payload });
    expect(newState.report['Сводный отчет']).toEqual({
      data: payload.data,
      params: payload.params,
    });
    expect(newState.activeReport).toBe(payload.nameReport);
  });

  it('action SET_ACTIVE_REPORT.', () => {
    const payload = 'NAME_REPORT';
    const newState = reportReducer(undefined, { type: CONST_ACTION.SET_ACTIVE_REPORT, payload });
    expect(newState.activeReport).toBe(payload);
  });
});
