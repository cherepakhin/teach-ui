import { CONST_ACTION } from '../constants';

import departments from '../fixtures/departments.json';

const initialState = {
  departments,
  // departments: [], //для реала
};


const setupDepartmentReducer = function (state = initialState, action) {
  switch (action.type) {
    case CONST_ACTION.INIT_VAR: {
      if (action.payload.departments !== undefined) {
        return {
          ...state,
          departments: action.payload.departments,
        };
      }
      return { ...state };
    }
    default:
      return state;
  }
};

export default setupDepartmentReducer;
