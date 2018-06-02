import soFetch from '../util/soFetch';
import { formatTime } from '../util';
import { history } from '../store';
import { showMessage } from './ErrorActions';
import { CONST_ACTION, URL_SERVER } from '../constants';

export const changePage = function () {
  return (dispatch) => {
    dispatch({
      type: CONST_ACTION.PROGRESS_SHOW,
    });
    return soFetch.get({ url: `${URL_SERVER}/var/`, data: {} })
      .then((json) => {
        dispatch({
          type: CONST_ACTION.INIT_VAR,
          payload: json,
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

/**
 * sendAnswer - Посылка на проверку ответа на вопрос
 * @param  {int} question_n номер вопроса
 * @param  {int} answer_n   номер ответа
 * @param  {Date} timeBegin время показа вопроса
 * @param  {Date} timeEnd   время ответа
 * @return {feature} хар-ка дополненная результатом ответа (is_ok)
 */

// TODO: ТОЛЬКО ДЛЯ ТЕСТОВ
// export const _sendAnswer = function (question_n, answer_n, pageOnClose = '/question') {
//   return (dispatch) => {
//     dispatch({
//       type: CONST_ACTION.PROGRESS_SHOW,
//     });
//     dispatch({
//       type: CONST_ACTION.SET_RESULT,
//       payload: {
//         feature: fixtures[0].feature,
//         pageOnClose,
//       },
//     });
//     dispatch({
//       type: CONST_ACTION.PROGRESS_HIDE,
//     });
//     history.push('/result');
//   };
// };

export const sendAnswer = function (question_n, answer_n, timeBegin, timeEnd, pageOnClose = '/') {
  return (dispatch) => {
    dispatch({
      type: CONST_ACTION.PROGRESS_SHOW,
    });
    return soFetch.post({
      url: `${URL_SERVER}/result/exam/`, data: {
        question_n,
        answer_n,
        time_begin: formatTime(timeBegin),
        time_end: formatTime(timeEnd),
      },
    })
      .then((json) => {
        dispatch({
          type: CONST_ACTION.SET_RESULT,
          payload: {
            feature: json.feature,
            is_correct: json.is_correct,
            pageOnClose,
          },
        });
        dispatch({
          type: CONST_ACTION.PROGRESS_HIDE,
        });
        history.push('/result');
      }).catch((ex) => {
        dispatch({ type: CONST_ACTION.PROGRESS_HIDE });
        showMessage(dispatch, ex.message);
      });
  };
};

