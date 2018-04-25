import { showMessage } from './ErrorActions';
import soFetch from '../util/soFetch';
import { CONST_ACTION, URL_SERVER } from '../constants';

export const refresh = function () {
  return dispatch => soFetch.get({ url: `${URL_SERVER}/feature_group/root/`, data: {} })
    .then((json) => {
      // json.forEach(f => console.log(`json ${f.name}`));
      dispatch({
        type: CONST_ACTION.REFRESH_FEATURE_GROUPS,
        payload: json,
      });
    }).catch((ex) => {
      console.log(`refresh:${ex.message}`);
      showMessage(dispatch, ex.message);
    });
};

export const create = function (featureGroup) {
  // console.log('create');
  return dispatch => soFetch.post({ url: `${URL_SERVER}/feature_group/`, data: { ...featureGroup } })
    .then((json) => {
      dispatch({
        type: CONST_ACTION.REFRESH_FEATURE_GROUP,
        payload: json,
      });
    }).catch((ex) => {
      showMessage(dispatch, ex.message);
    });
};

export const remove = function (n) {
  return (dispatch, getState) => soFetch.delete({ url: `${URL_SERVER}/feature_group/${n}/`, data: {} })
    .then(() => refresh()(dispatch, getState))
    .catch((ex) => {
      console.log(`remove:${ex.message}`);
      showMessage(dispatch, ex.message);
    });
};

export const save = function (featureGroup) {
  // console.log('save feature_group');
  // console.log(featureGroup);
  return (dispatch) => {
    if (featureGroup.n <= 0) {
      // console.log('save-create');
      return create(featureGroup)(dispatch);
    }
    return soFetch.post({ url: `${URL_SERVER}/feature_group/${featureGroup.n}/`, data: { ...featureGroup } })
      .then((json) => {
        dispatch({
          type: CONST_ACTION.REFRESH_FEATURE_GROUP,
          payload: json,
        });
      }).catch((ex) => {
        showMessage(dispatch, ex.message);
      });
  };
};

