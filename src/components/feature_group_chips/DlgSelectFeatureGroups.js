import React, { Component } from 'react';
import { findIndex } from 'lodash';
import { shape, number, string, bool, arrayOf, func } from 'prop-types';
import {
  Button,
  DialogContainer,
} from 'react-md';
import FeatureGroupSelector from '../feature_group_selector/FeatureGroupSelector';

class DlgSelectFeatureGroups extends Component {
  static defaultProps={
    selectedFeatureGroups: [],
    featureGroups: [],
    onSave: () => {},
    onCancel: () => {},
    visible: false,
  }
  static propTypes = {
    // Выбранные группы
    selectedFeatureGroups: arrayOf(shape({
      n: number,
      parent_n: number,
      name: string,
    })),
    // Все группы
    featureGroups: arrayOf(shape({
      n: number,
      parent_n: number,
      name: string,
    })),
    onSave: func,
    onCancel: func,
    visible: bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      selected: [...props.selectedFeatureGroups],
    };
  }

  componentWillReceiveProps=props => this.setState({ selected: [...props.selectedFeatureGroups] })

  selectFeatureGroup=(featureGroup) => {
    const selected = [...this.state.selected];
    const idx = findIndex(selected, { n: featureGroup.n });
    if (idx >= 0) {
      selected.splice(idx, 1);
    } else {
      selected.push(featureGroup);
    }
    this.setState({ selected });
    // Почему-то не проходят тесты. Спотыкается на ...this.state
    // this.setState(...this.state, { selected });
  }

  save = () => {
    this.props.onSave([...this.state.selected]);
  }

  render() {
    const actions = [];
    actions.push(<Button flat secondary onClick={this.props.onCancel}>Отмена</Button>);
    actions.push(<Button flat primary onClick={this.save}>Сохранить</Button>);
    return (
      <DialogContainer
        id='dlg_select_feature_groups'
        visible={this.props.visible}
        onHide={this.props.onCancel}
        actions={actions}
        title='Отметьте группы'
      >
        <FeatureGroupSelector
          id='FeatureGroupSelector'
          featureGroups={this.props.featureGroups}
          selected={this.state.selected}
          onCheck={this.selectFeatureGroup}
        />
      </DialogContainer>
    );
  }
}

export default DlgSelectFeatureGroups;
