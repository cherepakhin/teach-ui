import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import { CONST_ACTION } from '../../constants';
import * as actions from '../ManualActions';
import * as rest from '../../rest/feature';
import { history } from '../../store';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const feature1 = {
  n: 1,
  name: 'FEATURE1',
  info: 'FEATURE1_INFO',
  info_profit: 'FEATURE1_INFO_PROFIT',
};
const feature2 = {
  n: 2,
  name: 'FEATURE2',
  info: 'FEATURE2_INFO',
  info_profit: 'FEATURE2_INFO_PROFIT',
};

describe('ManualActions', () => {
  it('Отбор хар-к по имени (filterFeatures)', () => {
    rest.getFeaturesByName = () => new Promise(resolve => resolve({
      count_rows: 2,
      features: [feature1, feature2],
    }));

    const expectedActions = [
      {
        type: CONST_ACTION.PROGRESS_SHOW,
      },
      {
        type: CONST_ACTION.FILTER_FEATURE_FOR_MANUAL,
        payload: {
          features: [feature1, feature2],
          countRows: 2,
          params: {
            startRow: 1,
            rowsPerPage: 10,
            name: 'SEARCH_NAME',
          },
        },
      },
      {
        type: CONST_ACTION.PROGRESS_HIDE,
      },
    ];

    const store = mockStore({
      manual: {
        countRows: 1,
        params: {
          startRow: 1,
          rowsPerPage: 1,
        },
      },
    });

    return store.dispatch(actions.filterFeatures('SEARCH_NAME', 1, 10))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('Отбор хар-к по имени (filterFeatures). Неопределены startRow и rowsPerPage', () => {
    rest.getFeaturesByName = () => new Promise(resolve => resolve({
      count_rows: 2,
      features: [feature1, feature2],
    }));

    const expectedActions = [
      {
        type: CONST_ACTION.PROGRESS_SHOW,
      },
      {
        type: CONST_ACTION.FILTER_FEATURE_FOR_MANUAL,
        payload: {
          features: [feature1, feature2],
          countRows: 2,
          params: {
            startRow: 1,
            rowsPerPage: 1,
            name: 'SEARCH_NAME',
          },
        },
      },
      {
        type: CONST_ACTION.PROGRESS_HIDE,
      },
    ];

    const store = mockStore({
      manual: {
        countRows: 1,
        params: {
          startRow: 1,
          rowsPerPage: 1,
        },
      },
    });

    return store.dispatch(actions.filterFeatures('SEARCH_NAME'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('Показ информации хар-ки (SET_FEATURE_FOR_MANUAL).', () => {
    const feature = {
      n: 1,
      name: 'FEATURE1',
    };
    const expectedActions = {
      type: CONST_ACTION.SET_FEATURE_FOR_MANUAL,
      payload: feature,
    };

    const store = mockStore({
      manual: {
        countRows: 1,
        params: {
          startRow: 1,
          rowsPerPage: 1,
        },
        feature: [],
      },
    });

    expect(store.dispatch(actions.showFeatureInfo(feature))).toEqual(expectedActions);
    expect(history.location.pathname).toBe('/manual/feature');
  });
});
