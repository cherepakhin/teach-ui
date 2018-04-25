import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { findIndex } from 'lodash';
import * as actions from '../../actions/SetupFeatureGroupActions';
import CardFeatureGroup from './CardFeatureGroup';

class SetupFeatureGroupPage extends React.Component {
  constructor(props) {
    super(props);
    this.onClickParent = this.onClickParent.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  state = {
    selectedParentN: -1,
    parents: this.props.featureGroups,
    children: [],
  }

  componentWillMount() {
    this.props.actions.refresh();
  }

  componentWillReceiveProps(newProps) {
    this.setState(...this.state, { parents: newProps.featureGroups });
    if (this.state.selectedParentN >= 0) {
      const idx = findIndex(newProps.featureGroups, { n: this.state.selectedParentN });
      if (idx >= 0) {
        this.setState(...this.state, { children: newProps.featureGroups[idx].children });
      }
    }
  }

  onClickParent(f) {
    // console.log('onClick');
    // console.log(f);
    this.setState(...this.state, { selectedParentN: f.n, children: f.children });
  }

  onSave(f) {
    // console.log('onSave');
    // console.log(f);
    this.props.actions.save(f);
  }

  onDelete(f) {
    // console.log('onDelete');
    // console.log(f);
    if (f.parent_n < 0) {
      this.setState(...this.state, { selectedParentN: -1, children: [] });
    }
    this.props.actions.remove(f.n);
  }

  render() {
    return (
      <div className='md-grid'>
        <CardFeatureGroup
          title='Метагруппы'
          parent_n={-1}
          featureGroups={this.state.parents}
          onClick={this.onClickParent}
          onSave={this.onSave}
          onDelete={this.onDelete}
          selectedParentN={this.state.selectedParentN}
        />
        <CardFeatureGroup
          title='Подгруппы'
          parent_n={this.state.selectedParentN}
          featureGroups={this.state.children}
          onClick={() => {}}
          onSave={this.onSave}
          onDelete={this.onDelete}
          selectedParentN={-1}
        />
      </div>
    );
  }
}

const mapStateToProps = function (state) {
  return { ...state.featureGroup };
};

const mapDispatchToProps = function (dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

SetupFeatureGroupPage.propTypes = {
  featureGroups: PropTypes.arrayOf(PropTypes.shape({
    n: PropTypes.number.isRequired,
    parent_n: PropTypes.number,
    name: PropTypes.string.isRequired,
  })).isRequired,
  actions: PropTypes.shape({
    create: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    refresh: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired,
  }).isRequired,
};

const ConnectedSetupFeatureGroupPage = connect(mapStateToProps, mapDispatchToProps)(SetupFeatureGroupPage);
export { SetupFeatureGroupPage, ConnectedSetupFeatureGroupPage };
