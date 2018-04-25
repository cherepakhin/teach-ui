import React from 'react';
import { Grid, Cell, Button } from 'react-md';
import { string, number, func, arrayOf, shape } from 'prop-types';
import FeatureGroupChip from './FeatureGroupChip';

const FeatureGroupChips = props => (
  <Grid className='md-text-field-container--padded-block'>
    <Cell size={12}>
      <div className='chips__list'>
        <Button
          raised
          primary
          onClick={props.addChip}
        >Добавить группу
        </Button>
        {props.featureGroups.map(f => (<FeatureGroupChip
          key={`FeatureGroupChip${f.n}`}
          id={`FeatureGroupChip${f.n}`}
          {...f}
          deleteChip={props.deleteChip}
        />))}
      </div>
    </Cell>
  </Grid>
);

FeatureGroupChips.propTypes = {
  featureGroups: arrayOf(shape({
    n: number,
    name: string,
    parent_name: string,
  })),
  deleteChip: func,
  addChip: func,
};

FeatureGroupChips.defaultProps = {
  featureGroups: [],
  deleteChip: () => {},
  addChip: () => {},
};

export default FeatureGroupChips;
