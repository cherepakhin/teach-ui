import React from 'react';
import { pull } from 'lodash';
import { Card } from 'react-md';
import { number, string, shape, arrayOf } from 'prop-types';
import FeatureGroupSelector from './FeatureGroupSelector';

class FeatureGroupSelectorPage extends React.Component {
  static propTypes = {
    selected: arrayOf(shape({
      n: number,
      name: string,
    })),
    featureGroups: arrayOf(shape({
      n: number,
      name: string,
    })),
  };

  static defaultProps = {
    selected: [],
    featureGroups: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      selected: [...props.selected],
    };
  }

  selectFeatureGroups=(featureGroup) => {
    let selected = [...this.state.selected];
    if (selected.includes(featureGroup)) {
      selected = pull(selected, featureGroup);
    } else {
      selected.push(featureGroup);
    }
    this.setState({ selected });
    // Почему-то не проходят тесты. Спотыкается на ...this.state
    // this.setState(...this.state, { selected });
  }

  render() {
    return (
      <div className='md-grid'>
        <Card className='md-cell md-paper md-paper--1'>
          <FeatureGroupSelector
            id='featureGroupSelector'
            featureGroups={this.props.featureGroups}
            selected={this.state.selected}
            onCheck={this.selectFeatureGroups}
          />
        </Card>
      </div>);
  }
}

export default FeatureGroupSelectorPage;
