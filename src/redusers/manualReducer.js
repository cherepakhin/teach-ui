import { CONST_ACTION } from '../constants';

import fixtures from '../fixtures/questions.json';
//  Для тестов
const getFeatures = function () {
  const features = [];
  fixtures.map(question => features.push(question.feature));
  for (let i = 0; i < 10; i++) {
    features.push({
      n: i,
      name: `FEATURE${i}`,
      info: `FEATURE${i}_INFO`,
      info_profit: `FEATURE${i}_INFO_PROFIT`,
    });
  }
  return features;
};


const initialState = {
  // features: getFeatures(),
  features: [],
  countRows: 0, // всего строк
  params: {
    startRow: 0, // показывать с позиции
    rowsPerPage: 10,
    name: '', // имя для фильтра
  },
  feature: {
    n: 0,
    name: '',
    info: '',
    info_profit: '',
    feature_group: [],
  },
};


const manualReducer = function (state = initialState, action) {
  switch (action.type) {
    // Отбор по имени
    case CONST_ACTION.FILTER_FEATURE_FOR_MANUAL: {
      return {
        ...state,
        countRows: action.payload.countRows,
        features: [...action.payload.features],
        params: action.payload.params,
      };
    }
    case CONST_ACTION.SET_FEATURE_FOR_MANUAL: {
      return {
        ...state,
        feature: action.payload,
      };
    }
    default:
      return state;
  }
};

export default manualReducer;
