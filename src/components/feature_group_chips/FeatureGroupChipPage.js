import React from 'react';
import { remove } from 'lodash';
import { func, shape, number, string, arrayOf } from 'prop-types';

import FeatureGroupChips from './FeatureGroupChips';
import DlgSelectFeatureGroups from './DlgSelectFeatureGroups';

class FeatureGroupChipPage extends React.Component {
  static propTypes = {
    // Все дерево групп
    featureGroups: arrayOf(shape({
      n: number,
      parent_n: number,
      name: string,
    })),
    // Отмеченные группы
    selectedFeatureGroups: arrayOf(shape({
      n: number,
      parent_n: number,
      name: string,
    })),
    // Функция сохранения изменений
    onSave: func,
  }

  static defaultProps={
    featureGroups: [],
    selectedFeatureGroups: [],
    onSave(arrSelected) {
      throw new Error('ERROR. Function onSave() in FeatureGroupChipPage.js not defined!');
    },
  }

  constructor(props) {
    super(props);
    // const selectedFeatureGroups = selectedFeatureGroups0.map(f => f.n);
    this.state = {
      selectedFeatureGroups: [...this.props.selectedFeatureGroups],
      visibleDlg: false,
    };
  }

  selectFeatureGroups=(_selectedFeatureGroups) => {
    // console.log(_selectedFeatureGroups);
    this.setState(() => ({
      visibleDlg: false,
    }));
    // console.log(_selectedFeatureGroups);
    if (_selectedFeatureGroups !== undefined) {
      const cmp = function (a1, a2) {
        return a1.name > a2.name;
      };
      _selectedFeatureGroups.sort(cmp);
      this.setState({ selectedFeatureGroups: [..._selectedFeatureGroups] });
      this.props.onSave(_selectedFeatureGroups);
    }
  }

  deleteChip=(n) => {
    // console.log(n);
    const _selectedFeatureGroups = [...this.state.selectedFeatureGroups];
    remove(_selectedFeatureGroups, { n });
    this.setState(...this.state, { selectedFeatureGroups: _selectedFeatureGroups });
    this.props.onSave(_selectedFeatureGroups);
  }

  showDlg=() => {
    this.setState(...this.state, { visibleDlg: true });
  }

  hideDlg=() => {
    this.setState(...this.state, { visibleDlg: false });
  }

  render() {
    return (
      <div>
        <DlgSelectFeatureGroups
          featureGroups={this.props.featureGroups}
          selectedFeatureGroups={this.state.selectedFeatureGroups}
          visible={this.state.visibleDlg}
          onCancel={this.hideDlg}
          onSave={this.selectFeatureGroups}
        />
        <FeatureGroupChips
          featureGroups={this.state.selectedFeatureGroups}
          deleteChip={this.deleteChip}
          addChip={this.showDlg}
        />
      </div>
    );
  }
}

export default FeatureGroupChipPage;

