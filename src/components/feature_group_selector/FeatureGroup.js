import React from 'react';
import { func, number, string, shape, arrayOf } from 'prop-types';
import Checkbox from 'react-md/lib/SelectionControls/Checkbox';
import List from 'react-md/lib/Lists/List';
import { sortBy, findIndex } from 'lodash';
import TitleFeatureGroup from './TitleFeatureGroup';

class FeatureGroup extends React.Component {
  static propTypes = {
    name: string,
    children: arrayOf(shape({
      n: number,
      name: string,
    })),
    selected: arrayOf(shape({
      n: number,
      name: string,
    })),
    onCheck: func,
  };

  static defaultProps = {
    name: '',
    children: [],
    selected: [],
    onCheck: () => { },
  };

  state = {
    collapsed: true,
  }

  setCollapsed = () => {
    this.setState({ collapsed: !this.state.collapsed });
  }

  isChecked(featureGroup) {
    return findIndex(this.props.selected, { n: featureGroup.n }) >= 0;
  }

  render() {
    return (
      <List>
        <TitleFeatureGroup
          name={this.props.name}
          setCollapsed={this.setCollapsed}
          collapsed={this.state.collapsed}
        />
        {sortBy(this.props.children, ['name']).map((featureGroup) => {
          const checked = this.isChecked(featureGroup);
          if (checked || !this.state.collapsed) {
            return (<Checkbox
              key={featureGroup.n}
              id={`child${featureGroup.n}`}
              name={featureGroup.name}
              label={featureGroup.name}
              defaultChecked={checked}
              onChange={() => this.props.onCheck(featureGroup)}
              className='md-typography-include-text-container'
            />);
          } return '';
        })}
      </List>
    );
  }
}

export default FeatureGroup;
