import { findIndex } from 'lodash';
import { CONST_ACTION } from '../constants';

const initialState = {
  features: [],
  countRows: 0, // всего строк
  params: {
    startRow: 0, // показывать с позиции
    rowsPerPage: 10,
    name: '', // имя для фильтра
  },
};

const featureReducer = function (state = initialState, action) {
  switch (action.type) {
    // Обновление характкристики после редактирования
    case CONST_ACTION.REFRESH_FEATURE: {
      const newState = { ...state };
      const idx = findIndex(newState.features, { n: action.payload.n });
      if (idx >= 0) {
        newState.features[idx] = { ...action.payload };
      } else {
        newState.features.push({ ...action.payload });
      }
      return { ...newState };
    }
    // Отбор по имени
    case CONST_ACTION.FILTER_FEATURE_FOR_EDIT: {
      return { ...state, ...action.payload };
    }
    // Начальная установка
    case CONST_ACTION.INIT_VAR: {
      const newState = { ...state };
      if (action.payload.features !== undefined) {
        newState.features = [...action.payload.features];
      }
      return newState;
    }
    default:
      return state;
  }
};

export default featureReducer;
