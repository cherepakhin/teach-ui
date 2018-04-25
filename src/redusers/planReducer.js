import { CONST_ACTION } from '../constants';

const _ddate = new Date();
const year = _ddate.getFullYear();
const month = _ddate.getMonth() + 1;

const initialState = {
  year,
  month,
  plans: [],
};


const planReducer = function (state = initialState, action) {
  switch (action.type) {
    case CONST_ACTION.REFRESH_PLAN: {
      if (action.payload.plans !== undefined) {
        return {
          ...state,
          plans: action.payload.plans,
        };
      }
      return { ...state };
    }
    case CONST_ACTION.CHANGE_PLAN: {
      const { year, month } = { ...action.payload };
      return {
        ...state,
        year,
        month,
      };
    }
    default:
      return state;
  }
};

export default planReducer;
