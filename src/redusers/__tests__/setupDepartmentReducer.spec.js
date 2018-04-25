import setupDepartmentReducer from '../setupDepartmentReducer';
import { CONST_ACTION } from '../../constants';
import departments from '../../fixtures/departments.json';

const defaultState = {
  departments,
};

describe('setupDepartmentReducer', () => {
  it('default init', () => {
    expect(setupDepartmentReducer(undefined, {}))
      .toEqual(defaultState);
  });

  it('INIT_VAR', () => {
    const newDepartments = [{ n: 1, name: 'Магазин №1' }];

    const newState = setupDepartmentReducer(
      defaultState,
      {
        type: CONST_ACTION.INIT_VAR,
        payload: {
          departments: newDepartments,
        },
      },
    );
    expect(newState.departments).toEqual(newDepartments);
  });
});
