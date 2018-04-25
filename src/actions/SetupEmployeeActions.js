import { showMessage } from './ErrorActions';
import { CONST_ACTION, URL_SERVER } from '../constants';
import soFetch from '../util/soFetch';


export const refresh = function () {
  return dispatch => soFetch.get({ url: `${URL_SERVER}/employee/`, data: {} })
    .then((json) => {
      dispatch({
        type: CONST_ACTION.INIT_VAR,
        payload: {
          employees: json,
        },
      });
    }).catch((ex) => {
      showMessage(dispatch, ex.message);
    });
};

export const remove = function (employee) {
  return dispatch => soFetch.delete({ url: `${URL_SERVER}/employee/${employee.n}/`, data: {} })
    .then(() => {
      refresh()(dispatch);
    }).catch((ex) => {
      showMessage(dispatch, ex.message);
    });
};

export const create = function (employee) {
  return dispatch => soFetch.post({ url: `${URL_SERVER}/employee/`, data: { ...employee } })
    .then(() => {
      refresh()(dispatch);
    }).catch((ex) => {
      showMessage(dispatch, ex.message);
    });
};

export const save = function (employee) {
  return (dispatch) => {
    if (employee.n <= 0) {
      return create(employee)(dispatch);
    }
    return soFetch.post({ url: `${URL_SERVER}/employee/${employee.n}/`, data: { ...employee } })
      .then(() => {
        refresh()(dispatch);
      }).catch((ex) => {
        showMessage(dispatch, ex.message);
      });
  };
};
