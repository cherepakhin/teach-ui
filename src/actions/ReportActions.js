import soFetch from '../util/soFetch';
import { showMessage } from './ErrorActions';
import { CONST_ACTION, URL_SERVER, mapNameReportToURL } from '../constants';


export const buildPivotReport = function (startDate, endDate, department) {
  return (dispatch) => {
    dispatch({
      type: CONST_ACTION.PROGRESS_SHOW,
    });
    return soFetch.get({ url: `${URL_SERVER}/result/report/`, data: { start_date: startDate, end_date: endDate, department } })
      .then((json) => {
        dispatch({
          type: CONST_ACTION.SET_REPORT,
          payload: {
            report: json,
            params: {
              startDate,
              endDate,
              department,
            },
          },
        });
        dispatch({
          type: CONST_ACTION.PROGRESS_HIDE,
        });
      }).catch((ex) => {
        dispatch({ type: CONST_ACTION.PROGRESS_HIDE });
        showMessage(dispatch, ex.message);
      });
  };
};

// Установка текущего отчета
export const setActiveReport = function (nameReport) {
  return (dispatch) => {
    dispatch({
      type: CONST_ACTION.SET_ACTIVE_REPORT,
      payload: nameReport,
    });
  };
};

export const buildReport = function (nameReport, params) {
  return (dispatch) => {
    dispatch({
      type: CONST_ACTION.PROGRESS_SHOW,
    });
    const report = mapNameReportToURL.get(nameReport);
    return soFetch.get({ url: `${URL_SERVER}/report/${report.url}/`, data: { ...params } })
      .then((json) => {
        dispatch({
          type: CONST_ACTION.PROGRESS_HIDE,
        });
        if (json.message !== undefined) {
          showMessage(dispatch, json.message);
        } else {
          dispatch({
            type: CONST_ACTION.SET_REPORT,
            payload: {
              nameReport,
              data: json,
              params,
            },
          });
        }
      }).catch((ex) => {
        dispatch({ type: CONST_ACTION.PROGRESS_HIDE });
        showMessage(dispatch, ex.message);
      });
  };
};

