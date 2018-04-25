import React from 'react';
import { Card } from 'react-md';
import { sortBy } from 'lodash';
import { func, array, arrayOf, shape, string, number } from 'prop-types';
// import { findIndex } from 'lodash';
import FeatureGroup from './FeatureGroup';

class FeatureGroupSelector extends React.Component {
  static defaultProps = {
    featureGroups: [],
    selected: [],
    onCheck: func,
  };

  static propTypes = {
    featureGroups: arrayOf(shape({
      n: number,
      name: string,
      parent_name: string,
      children: array,
    })),
    // selected: arrayOf(shape({
    //   n: number,
    //   name: string,
    //   parent_name: string,
    //   children: array,
    // })),
    selected: arrayOf(shape({
      n: number,
      name: string,
    })),
    onCheck: () => {}
  };

  // onCheckFeature=(featureGroup) => {
  //   console.log(featureGroup);
  // }


  render() {
    return (
      <Card>
        {this.props.featureGroups ?
           sortBy(this.props.featureGroups, ['name']).map((featureGroup) => {
             return (<FeatureGroup
               key={`featureGroup${featureGroup.n}`}
               id={`featureGroup${featureGroup.n}`}
               {...featureGroup}
               onCheck={this.props.onCheck}
               selected={this.props.selected}
             />);
             }) : undefined
         }
      </Card>
    );
  }
}


export default FeatureGroupSelector;

