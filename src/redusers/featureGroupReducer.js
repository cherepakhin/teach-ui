import { findIndex } from 'lodash';
import { CONST_ACTION } from '../constants';

const initialState = {
  featureGroups: [],
};

const featureGroupReducer = function (state = initialState, action) {
  switch (action.type) {
    // Обновление группы характкристики после редактирования
    case CONST_ACTION.REFRESH_FEATURE_GROUP: {
      const newState = { ...state };
      const featureGroup = { ...action.payload };
      let _featureGroups = [];
      if (featureGroup.parent_n === undefined || featureGroup.parent_n === null) {
        _featureGroups = newState.featureGroups;
      } else {
        const idx = findIndex(newState.featureGroups, { n: featureGroup.parent_n });
        _featureGroups = newState.featureGroups[idx].children;
      }

      const idx = findIndex(_featureGroups, { n: featureGroup.n });
      if (idx >= 0) {
        _featureGroups[idx] = featureGroup;
      } else {
        _featureGroups.push(featureGroup);
      }
      return { ...newState };
    }

    // Начальная установка
    case CONST_ACTION.REFRESH_FEATURE_GROUPS: {
      const newState = { ...state };
      if (action.payload !== undefined) {
        newState.featureGroups = [...action.payload];
      }
      return newState;
    }

    // Начальная установка
    case CONST_ACTION.INIT_VAR: {
      const newState = { ...state };
      if (action.payload !== undefined && action.payload.feature_groups !== undefined) {
        newState.featureGroups = [...action.payload.feature_groups];
      }
      return newState;
    }
    default:
      return state;
  }
};

export default featureGroupReducer;
