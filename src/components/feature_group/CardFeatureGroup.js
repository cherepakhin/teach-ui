import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardTitle,
  List,
  Button,
} from 'react-md';
import ItemFeatureGroup from './ItemFeatureGroup';
import DlgEditFeatureGroup from './DlgEditFeatureGroup';
import DlgConfirm from '../components/DlgConfirm';

class CardFeatureGroup extends PureComponent {
  static propTypes = {
    featureGroups: PropTypes.arrayOf(PropTypes.shape({
      n: PropTypes.number,
      name: PropTypes.string,
    })).isRequired,
    onSave: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    parent_n: PropTypes.number.isRequired,
  };

  state = {
    visibleDlg: false,
    visibleDeleteDlg: false,
    selectedFeatureGroup: {
      n: -1,
      name: '',
    },
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState(...this.state, { selectedFeatureGroup: nextProps.featureGroup });
  // }

  onDelete = () => {
    this.setState(...this.state, { visibleDeleteDlg: false });
    this.props.onDelete(this.state.selectedFeatureGroup);
  }


  getListFeatureGroup() {
    if (this.props.featureGroups !== undefined) {
      return this.props.featureGroups.map(f => (<ItemFeatureGroup
        key={`featureGroup${f.n}`}
        featureGroup={f}
        onClick={() => this.props.onClick(f)}
        onChange={() => this.showEditDlg(f)}
        onDelete={() => this.showDeleteDlg(f)}
      />));
    }
    return <div />;
  }

  showDeleteDlg(f) {
    this.setState(...this.state, { visibleDeleteDlg: true, selectedFeatureGroup: f });
  }

  hide = () => {
    this.setState(...this.state, { visibleDlg: false });
  };

  addFeatureGroup=() => {
    this.showEditDlg({
      n: -1,
      parent_n: this.props.parent_n,
      name: '',
    });
  }

  showEditDlg(f) {
    this.setState(...this.state, { visibleDlg: true, selectedFeatureGroup: f });
  }

  save = (f) => {
    this.hide();
    this.props.onSave(f);
  }

  render() {
    const addButton = (
      <div className='md-collapser--card'>
        <Button
          secondary
          tooltipLabel='Добавить новую группу'
          raised
          onClick={this.addFeatureGroup}
        >
         Добавить
        </Button>
      </div>);
    return (
      <Card
        defaultExpanded
        className='md-cell md-paper md-paper--1'
        children={
          <div>
            <DlgConfirm
              visible={this.state.visibleDeleteDlg}
              ok={this.onDelete}
              cancel={() => { this.setState(...this.state, { visibleDeleteDlg: false }); }}
              title='Удалить?'
            />
            <DlgEditFeatureGroup
              featureGroup={this.state.selectedFeatureGroup}
              save={this.save}
              cancel={this.hide}
              visible={this.state.visibleDlg}
              parent_n={this.props.parent_n}
            />
            <CardTitle
              title={this.props.title}
              children={addButton}
            />
            <List >
              {this.getListFeatureGroup()}
            </List>
          </div>
        }
      />
    );
  }
}

export default CardFeatureGroup;
