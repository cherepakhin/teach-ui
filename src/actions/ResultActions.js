import { history } from '../store';
import { CONST_ACTION } from '../constants';

export const setResult = function (feature, pageOnClose = '/question') {
  history.push('/result');
  return dispatch => dispatch({
    type: CONST_ACTION.SET_RESULT,
    payload: { feature, is_correct: undefined, pageOnClose },
  });
};

export const close = function () {
  return (dispatch, getState) => (history.push(getState().result.pageOnClose));
};
