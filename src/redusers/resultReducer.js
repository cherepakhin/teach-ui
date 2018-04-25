import { CONST_ACTION } from '../constants';


const initialState = {
  feature: {
    n: 0,
    name: '',
    info: '',
    info_profit: '',
  },
  pageOnClose: '/',
  is_correct: undefined,
};


const resultReducer = function (state = initialState, action) {
  switch (action.type) {
    case CONST_ACTION.SET_RESULT: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};

export default resultReducer;
