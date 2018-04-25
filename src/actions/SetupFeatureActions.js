import { showMessage } from './ErrorActions';
import soFetch from '../util/soFetch';
import { CONST_ACTION, URL_SERVER } from '../constants';
import { getFeaturesByName } from '../rest/feature';
import * as FeatureConv from './convertors/FeatureConv';

export const filterFeatures = function (name, startRow, rowsPerPage) {
  return (dispatch, getState) => {
    dispatch({
      type: CONST_ACTION.PROGRESS_SHOW,
    });
    if (startRow === undefined) {
      startRow = getState().feature.params.startRow;
    }
    if (rowsPerPage === undefined) {
      rowsPerPage = getState().feature.params.rowsPerPage;
    }
    return getFeaturesByName(name, startRow, rowsPerPage, 'full')
      .then((result) => {
        const features = result.features.map(f => FeatureConv.fromServer(f));
        dispatch({
          type: CONST_ACTION.FILTER_FEATURE_FOR_EDIT,
          payload: {
            countRows: result.count_rows,
            features,
            params: {
              startRow,
              rowsPerPage,
              name,
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

export const create = function (feature) {
  const featureForServer = FeatureConv.toServer(feature);
  return dispatch => soFetch.post({ url: `${URL_SERVER}/feature/`, data: { ...featureForServer } })
    .then((json) => {
      dispatch({
        type: CONST_ACTION.REFRESH_FEATURE,
        payload: json,
      });
    }).catch((ex) => {
      showMessage(dispatch, ex.message);
    });
};

export const remove = function (n) {
  return (dispatch, getState) => soFetch.delete({ url: `${URL_SERVER}/feature/${n}/`, data: {} })
    .then(() => filterFeatures(
      getState().feature.params.name,
      getState().feature.params.startRow,
      getState().feature.params.rowsPerPage,
    )(dispatch, getState)).catch((ex) => {
      showMessage(dispatch, ex.message);
    });
};

export const save = function (feature) {
  // console.log('save feature');
  // console.log(feature);
  const featureForServer = FeatureConv.toServer(feature);
  return (dispatch) => {
    if (featureForServer.n <= 0) {
      return create(featureForServer)(dispatch);
    }
    return soFetch.post({ url: `${URL_SERVER}/feature/${feature.n}/`, data: { ...featureForServer } })
      .then((json) => {
        dispatch({
          type: CONST_ACTION.REFRESH_FEATURE,
          payload: json,
        });
      }).catch((ex) => {
        showMessage(dispatch, ex.message);
      });
  };
};

export const changePage = function (startRow = 0, rowsPerPage) {
  return (dispatch, getState) => filterFeatures(
    getState().feature.params.name,
    startRow,
    rowsPerPage,
  )(dispatch, getState);
};
