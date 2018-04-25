import { CONST_ACTION } from '../constants';

const initialState = {
  progress: false,
  // token: 'JWT token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJcdTA0MjdcdTA0MzVcdTA0NDBcdTA0MzVcdTA0M2ZcdTA0MzBcdTA0NDVcdTA0MzhcdTA0M2QiLCJuYW1lIjoiXHUwNDI3XHUwNDM1XHUwNDQwXHUwNDM1XHUwNDNmXHUwNDMwXHUwNDQ1XHUwNDM4XHUwNDNkIn0._eoNfkuMnLeW0mnKe0z0U1IFCb_P4N6yiXwNCoDmbMA"',
  token: '',
  user: '',
  role: '',
};

const appReducer = function (state = initialState, action) {
  switch (action.type) {
    case CONST_ACTION.PROGRESS_SHOW:
      return { ...state, progress: true };
    case CONST_ACTION.PROGRESS_HIDE:
      return { ...state, progress: false };
    case CONST_ACTION.SET_TOKEN:
      return { ...state, ...action.payload };
    case CONST_ACTION.INIT_VAR: {
      const newState = { ...state };
      if (action.payload.features !== undefined) {
        newState.features = [...action.payload.features];
      }
      return newState;
    }

    default:
      return state;
  }
};

export default appReducer;
