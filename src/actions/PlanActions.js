import { showMessage } from './ErrorActions';
import { CONST_ACTION, URL_SERVER } from '../constants';
import soFetch from '../util/soFetch';


export const refresh = function () {
  return (dispatch, getState) => soFetch.get({
    url: `${URL_SERVER}/plan/${getState().plan.year}/${getState().plan.month}/`,
    data: {},
  })
    .then((json) => {
      dispatch({
        type: CONST_ACTION.REFRESH_PLAN,
        payload: {
          plans: json,
        },
      });
    }).catch((ex) => {
      showMessage(dispatch, ex.message);
    });
};

export const change = function (year, month) {
  return (dispatch, getState) => {
    dispatch({
      type: CONST_ACTION.CHANGE_PLAN,
      payload: {
        year,
        month,
      },
    });
    refresh()(dispatch, getState);
  };
};


export const remove = function (plan) {
  return (dispatch, getState) => soFetch.delete({ url: `${URL_SERVER}/plan/${plan.n}/`, data: {} })
    .then(() => {
      refresh()(dispatch, getState);
    }).catch((ex) => {
      showMessage(dispatch, ex.message);
    });
};

export const save = function (plan) {
  return (dispatch, getState) => soFetch.post({ url: `${URL_SERVER}/plan/${plan.n}/`, data: { ...plan } })
    .then(() => {
      refresh()(dispatch, getState);
    }).catch((ex) => {
      showMessage(dispatch, ex.message);
    });
};

// export const create = function (plan) {
//   return (dispatch, getState) => soFetch.post({ url: `${URL_SERVER}/plan/`, data: { ...plan } })
//     .then(() => {
//       refresh()(dispatch, getState);
//     }).catch((ex) => {
//       showMessage(dispatch, ex.message);
//     });
// };

