import { showMessage } from './ErrorActions';
import { CONST_ACTION, URL_SERVER } from '../constants';
import soFetch from '../util/soFetch';


export const refresh = function () {
  return dispatch => soFetch.get({ url: `${URL_SERVER}/department/`, data: {} })
    .then((json) => {
      dispatch({
        type: CONST_ACTION.INIT_VAR,
        payload: {
          departments: json,
        },
      });
    }).catch((ex) => {
      showMessage(dispatch, ex.message);
    });
};

export const remove = function (department) {
  return dispatch => soFetch.delete({ url: `${URL_SERVER}/department/${department.n}/`, data: {} })
    .then(() => {
      refresh()(dispatch);
    }).catch((ex) => {
      showMessage(dispatch, ex.message);
    });
};

export const save = function (department) {
  return dispatch => soFetch.post({ url: `${URL_SERVER}/department/${department.n}/`, data: { name: department.name } })
    .then(() => {
      refresh()(dispatch);
    }).catch((ex) => {
      showMessage(dispatch, ex.message);
    });
};

export const create = function (name) {
  return dispatch => soFetch.post({ url: `${URL_SERVER}/department/`, data: { name } })
    .then(() => {
      refresh()(dispatch);
    }).catch((ex) => {
      showMessage(dispatch, ex.message);
    });
};

