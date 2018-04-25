export const toServer = function (feature) {
  const ret = { ...feature };
  if (feature.featureGroups !== undefined) {
    ret.feature_group = [...feature.featureGroups];
    delete ret.featureGroups;
  }
  return ret;
};

export const fromServer = function (feature) {
  const ret = { ...feature };
  if (feature.feature_group === undefined) {
    ret.featureGroups = [];
  } else {
    ret.featureGroups = [...feature.feature_group];
  }

  delete ret.feature_group;
  return ret;
};
