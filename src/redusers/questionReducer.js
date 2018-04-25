import { CONST_ACTION } from '../constants';

const initialState = {
  question: {
    n: 0,
  },
  // question, // для тестов
};

const questionReducer = function (state = initialState, action) {
  switch (action.type) {
    // Начальная установка
    case CONST_ACTION.SET_QUESTION: {
      const _state = { ...state };
      if (action.payload.question !== undefined) {
        _state.question = { ...action.payload.question };
      }
      return _state;
    }

    default:
      return state;
  }
};

export default questionReducer;
