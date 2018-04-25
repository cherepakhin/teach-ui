import { history } from '../store';
import { showMessage } from './ErrorActions';
import { CONST_ACTION } from '../constants';
import { getFeaturesByName } from '../rest/feature';

export const filterFeatures = function (searchName, startRow, rowsPerPage) {
  return (dispatch, getState) => {
    dispatch({
      type: CONST_ACTION.PROGRESS_SHOW,
    });
    if (startRow === undefined) {
      startRow = getState().manual.params.startRow;
    }
    if (rowsPerPage === undefined) {
      rowsPerPage = getState().manual.params.rowsPerPage;
    }
    return getFeaturesByName(searchName, startRow, rowsPerPage, 'short')
      .then((result) => {
        dispatch({
          type: CONST_ACTION.FILTER_FEATURE_FOR_MANUAL,
          payload: {
            countRows: result.count_rows,
            features: result.features,
            params: {
              startRow,
              rowsPerPage,
              name: searchName,
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

export const changePage = function (startRow = 0, rowsPerPage) {
  return (dispatch, getState) =>
    filterFeatures(getState().manual.params.name, startRow, rowsPerPage)(dispatch, getState);
};

export const closeFeatureInfo = function () {
  return () => history.push('/manual');
};

export const showFeatureInfo = function (feature) {
  return (dispatch) => {
    history.push('/manual/feature');
    return dispatch({
      type: CONST_ACTION.SET_FEATURE_FOR_MANUAL,
      payload: feature,
    });
  };
};
