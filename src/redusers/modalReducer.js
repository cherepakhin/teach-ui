import { CONST_ACTION } from '../constants';

const initialState = {
  modalType: '',
  modalProps: {},
};

const modal = function (state = initialState, action) {
  switch (action.type) {
    case CONST_ACTION.OPEN_DIALOG: {
      return { ...state, ...action.payload };
    }

    case CONST_ACTION.CLOSE_DIALOG: {
      return initialState;
    }

    default:
      return state;
  }
};

export default modal;
