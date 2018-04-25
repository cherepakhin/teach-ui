import featureReducer from '../featureReducer';
import { CONST_ACTION } from '../../constants';

const defaultState = {
  features: [],
  countRows: 0, // всего строк
  params: {
    startRow: 0, // показывать с позиции
    rowsPerPage: 10,
    name: '', // имя для фильтра
  },
};

describe('featureReducer', () => {
  it('default init', () => {
    expect(featureReducer(undefined, {}))
      .toEqual(defaultState);
  });
  it('action INIT_VAR', () => {
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
    expect(featureReducer(undefined, { type: CONST_ACTION.INIT_VAR, payload: { features } }))
      .toEqual({
        features,
        countRows: 0, // всего строк
        params: {
          startRow: 0, // показывать с позиции
          rowsPerPage: 10,
          name: '', // имя для фильтра
        },
      });
  });

  it('action REFRESH_FEATURE', () => {
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
      params: {
        name: '',
      },
    };
    const changedFeature = { n: 1, name: 'CHANGED_NAME' };
    expect(featureReducer(state, { type: CONST_ACTION.REFRESH_FEATURE, payload: changedFeature }))
      .toEqual({
        features: [
          changedFeature,
          features[1],
        ],
        params: {
          name: '',
        },
      });
  });
  it('action REFRESH_FEATURE(добавлен новый Feature)', () => {
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
      params: {
        name: '',
      },
    };
    const changedFeature = { n: 3, name: 'CHANGED_NAME' };
    expect(featureReducer(state, { type: CONST_ACTION.REFRESH_FEATURE, payload: changedFeature }))
      .toEqual({
        features: [
          features[0],
          features[1],
          changedFeature,
        ],
        params: {
          name: '',
        },
      });
  });

  it('action FILTER_FEATURE_FOR_EDIT', () => {
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
      params: {
        name: '',
      },
    };
    expect(featureReducer(state, {
      type: CONST_ACTION.FILTER_FEATURE_FOR_EDIT,
      payload: {
        features: [
          {
            n: 1,
            name: 'FEATURE1',
          },
        ],
        countRows: 1, // всего строк
        params: {
          startRow: 0, // показывать с позиции
          rowsPerPage: 10,
          name: 'SEARCH_NAME', // имя для фильтра
        },
      },
    }))
      .toEqual({
        features: [
          {
            n: 1,
            name: 'FEATURE1',
          },
        ],
        countRows: 1, // всего строк
        params: {
          startRow: 0, // показывать с позиции
          rowsPerPage: 10,
          name: 'SEARCH_NAME', // имя для фильтра
        },
      });
  });
});
