import planReducer from '../planReducer';
import { CONST_ACTION } from '../../constants';
// import plans from '../../fixtures/plans.json';

const defaultState = {
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  plans: [],
};

describe('planReducer', () => {
  it('default init', () => {
    expect(planReducer(undefined, {}))
      .toEqual(defaultState);
  });

  it('CHANGE_PLAN', () => {
    const expectedState = {
      year: 2018,
      month: 1,
      plans: [],
    };

    const newState = planReducer(
      defaultState,
      {
        type: CONST_ACTION.CHANGE_PLAN,
        payload: {
          year: 2018,
          month: 1,
        },
      },
    );
    expect(newState).toEqual(expectedState);
  });
});
