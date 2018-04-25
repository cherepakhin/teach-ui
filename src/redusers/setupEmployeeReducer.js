import { CONST_ACTION } from '../constants';

/* import employees from '../fixtures/employees.json';
import employee_groups from '../fixtures/employee_groups.json';

const initialState = {
  employees,
  employee_groups,
};
*/
const initialState = {
  employees: [],
  employee_groups: [],
};


const setupEmployeeReducer = function (state = initialState, action) {
  switch (action.type) {
    case CONST_ACTION.INIT_VAR: {
      const newState = { ...state };
      if (action.payload.employees !== undefined) {
        newState.employees = [...action.payload.employees];
      }
      if (action.payload.employee_groups !== undefined) {
        newState.employee_groups = [...action.payload.employee_groups];
      }
      return newState;
    }
    default:
      return state;
  }
};

export default setupEmployeeReducer;
