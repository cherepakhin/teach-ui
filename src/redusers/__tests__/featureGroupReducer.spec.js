import featureGroupReducer from '../featureGroupReducer';
import { CONST_ACTION } from '../../constants';
import _featureGroups from '../../fixtures/feature_groups.json';

const defaultState = {
  featureGroups: [],
};

let featureGroups = [];

describe('featureGroupReducer', () => {
  beforeEach(() => {
    // console.log('---');
    featureGroups = JSON.parse(JSON.stringify(_featureGroups));
    // console.log(featureGroups);
  });

  it('default init', () => {
    expect(featureGroupReducer(undefined, {}))
      .toEqual(defaultState);
  });

  it('action REFRESH_FEATURE_GROUPS', () => {
    expect(featureGroupReducer(undefined, {
      type: CONST_ACTION.REFRESH_FEATURE_GROUPS,
      payload: [...featureGroups],
    }))
      .toEqual({
        featureGroups,
      });
  });

  it('action REFRESH_FEATURE_GROUP для метагруппы (добавить в список новую)', () => {
    const changedFeatureGroup = {
      n: 4,
      name: 'CHANGED_NAME',
      parent_n: null,
    };
    const newState = featureGroupReducer({ featureGroups: [...featureGroups] }, {
      type: CONST_ACTION.REFRESH_FEATURE_GROUP,
      payload: { ...changedFeatureGroup },
    });

    expect(newState.featureGroups[3]).toEqual(changedFeatureGroup);
    expect(newState.featureGroups.length).toBe(4);
  });

  it('action REFRESH_FEATURE_GROUP для метагруппы (обновление)', () => {
    const changedFeatureGroup = {
      n: 2,
      name: 'CHANGED_NAME',
      parent_n: null,
    };
    const newState = featureGroupReducer({ featureGroups: [...featureGroups] }, {
      type: CONST_ACTION.REFRESH_FEATURE_GROUP,
      payload: { ...changedFeatureGroup },
    });

    expect(newState.featureGroups[1]).toEqual(changedFeatureGroup);
    expect(newState.featureGroups.length).toBe(3);
  });

  it('action REFRESH_FEATURE_GROUP для ПОДГРУППЫ (добавить в список новую)', () => {
    const changedFeatureGroup = {
      n: 32,
      name: 'CHANGED_NAME',
      parent_n: 3,
    };
    const newState = featureGroupReducer({ featureGroups: [...featureGroups] }, {
      type: CONST_ACTION.REFRESH_FEATURE_GROUP,
      payload: { ...changedFeatureGroup },
    });
    // console.log(newState.featureGroups[2]);
    expect(newState.featureGroups[2].children.length).toBe(2);
    expect(newState.featureGroups[2].children[1]).toEqual(changedFeatureGroup);
    expect(newState.featureGroups.length).toBe(3);
  });

  it('action REFRESH_FEATURE_GROUP для ПОДГРУППЫ (обновление)', () => {
    // const _featureGroups = require('../../fixtures/feature_groups.json');
    const changedFeatureGroup = {
      n: 31,
      name: 'CHANGED_NAME',
      parent_n: 3,
    };
    // console.log(featureGroups[2]);
    const newState = featureGroupReducer({ featureGroups: [...featureGroups] }, {
      type: CONST_ACTION.REFRESH_FEATURE_GROUP,
      payload: { ...changedFeatureGroup },
    });
    // console.log(newState.featureGroups[2]);
    expect(newState.featureGroups[2].children.length).toBe(1);
    expect(newState.featureGroups[2].children[0]).toEqual(changedFeatureGroup);
    expect(newState.featureGroups.length).toBe(3);
  });
});
