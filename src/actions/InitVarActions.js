import { history } from '../store';
import soFetch from '../util/soFetch';
import { showMessage } from './ErrorActions';
import { CONST_ACTION, URL_SERVER } from '../constants';
import mapDlg from '../containers/dlg/mapDlg';


export const initVar = function () {
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
        console.log('Failed initvar /var/', ex);
        mapDlg.get(CONST_ACTION.DLG_MESSAGE).show(dispatch, { message: `Ошибка: ${ex.message}` });
        dispatch({
          type: CONST_ACTION.PROGRESS_HIDE,
        });
      });
  };
};

export const getNextQuestion = function () {
  return dispatch => soFetch.post({ url: `${URL_SERVER}/question/get_next/`, data: {} })
    .then((json) => {
      dispatch({
        type: CONST_ACTION.SET_QUESTION,
        payload: {
          question: json,
        },
      });
      history.push('/question');
    }).catch((ex) => {
      dispatch({ type: CONST_ACTION.PROGRESS_HIDE });
      showMessage(dispatch, ex.message);
    });
};

export const login = function (name, password) {
  return (dispatch) => {
    soFetch.post({ url: `${URL_SERVER}/login/`, data: { name, password } })
      .then((json) => {
        dispatch({
          type: CONST_ACTION.SET_TOKEN,
          payload: {
            token: json.token,
            user: json.employee.name,
            role: json.employee.employee_group.name,
          },
        });
        console.log(dispatch);
        return initVar()(dispatch).then(() => {
          console.log('End InitVar');
          if (json.employee.employee_group.name !== 'Админ' && json.employee.employee_group.name !== '') {
            return getNextQuestion(json.employee.name)(dispatch);
          }
          return dispatch;
        });
      }).catch((ex) => {
        showMessage(dispatch, ex.message);
      });
  };
};
