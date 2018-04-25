import React from 'react';
import { Chip } from 'react-md';
import { string, number, func } from 'prop-types';

const FeatureGroupChip = props => (
  <Chip
    id={`feature_group_chip${props.n}`}
    label={`${props.parent_name} | ${props.name}`}
    removable
    onClick={() => props.deleteChip(props.n)}
  />
);

FeatureGroupChip.propTypes = {
  n: number,
  name: string,
  parent_name: string,
  deleteChip: func,
};

FeatureGroupChip.defaultProps = {
  n: -1,
  name: '',
  parent_name: '',
  deleteChip: () => {},
};

export default FeatureGroupChip;
