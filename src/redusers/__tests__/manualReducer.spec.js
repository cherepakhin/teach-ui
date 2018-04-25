import manualReducer from '../manualReducer';
import { CONST_ACTION } from '../../constants';

const defaultState = {
  features: [],
  countRows: 0, // всего строк
  params: {
    startRow: 0, // показывать с позиции
    rowsPerPage: 10,
    name: '',
  },
  feature: {
    n: 0,
    name: '',
    info: '',
    info_profit: '',
    feature_group: [],
  },
};

describe('manualReducer', () => {
  it('default init', () => {
    expect(manualReducer(undefined, {}))
      .toEqual(defaultState);
  });

  it('action FILTER_FEATURE_FOR_MANUAL', () => {
    const features = [
      {
        n: 1,
        name: 'FEATURE1',
      },
      {
        n: 2,
        name: 'FEATURE2',
      },
    ];
    const state = {
      features,
      countRows: 0, // всего строк
      params: {
        startRow: 0, // показывать с позиции
        rowsPerPage: 10,
        name: '',
      },
    };
    expect(manualReducer(state, {
      type: CONST_ACTION.FILTER_FEATURE_FOR_MANUAL,
      payload: {
        features,
        countRows: 1,
        params: {
          startRow: 0, // показывать с позиции
          rowsPerPage: 10,
          name: 'SEARCH_NAME',
        },
      },
    }))
      .toEqual({
        features,
        countRows: 1, // всего строк
        params: {
          startRow: 0, // показывать с позиции
          rowsPerPage: 10,
          name: 'SEARCH_NAME',
        },
      });
  });

  it('action SET_FEATURE_FOR_MANUAL', () => {
    const feature = {
      n: 1,
      name: 'FEATURE1',
    };
    const state = {
      features: [],
      countRows: 0, // всего строк
      params: {
        startRow: 0, // показывать с позиции
        rowsPerPage: 10,
        name: '',
      },
    };
    const newState = manualReducer(state, {
      type: CONST_ACTION.SET_FEATURE_FOR_MANUAL,
      payload: feature,
    });

    expect(newState.feature).toEqual(feature);
    expect(newState).toEqual({ ...state, feature });
  });
});
