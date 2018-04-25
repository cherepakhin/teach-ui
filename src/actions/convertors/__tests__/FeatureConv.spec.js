import * as FeatureConv from '../FeatureConv';

describe('FeatureConv', () => {
  it('to server check featureGroups', () => {
    const feature = {
      n: 1,
      featureGroups: [
        { n: 1 },
        { n: 2 },
      ],
    };
    const ret = FeatureConv.toServer(feature);
    expect(ret.feature_group).toEqual(feature.featureGroups);
    expect(ret.featureGroups).toBeUndefined();
    expect(ret.n).toEqual(feature.n);
  });

  it('from server convert featureGroups', () => {
    const feature = {
      n: 1,
      feature_group: [
        { n: 1 },
        { n: 2 },
      ],
    };
    const ret = FeatureConv.fromServer(feature);
    expect(ret.featureGroups).toEqual(feature.feature_group);
    expect(ret.feature_group).toBeUndefined();
    expect(ret.n).toEqual(feature.n);
  });

  it('from server convert featureGroups==null', () => {
    const feature = {
      n: 1,
    };
    const ret = FeatureConv.fromServer(feature);
    expect(ret.featureGroups).toEqual([]);
    expect(ret.feature_group).toBeUndefined();
    expect(ret.n).toEqual(feature.n);
  });
});
