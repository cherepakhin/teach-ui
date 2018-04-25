import React, { Component } from 'react';
import { findIndex, maxBy, remove } from 'lodash';
import {
  NavigationDrawer,
} from 'react-md';
import parents from '../fixtures/feature_groups.json';
import CardFeatureGroup from './CardFeatureGroup';

class FeatureGroupPage extends Component {
  constructor(props) {
    super(props);
    this.onClickParent = this.onClickParent.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  state = {
    selectedParentN: -1,
    children: [],
  }

  onClickParent(f) {
    // console.log('onClick');
    // console.log(f);
    this.setState(...this.state, { selectedParentN: f.n, children: f.children });
  }

  onSave(f) {
    // console.log('onSave');
    // console.log(f);
    if (f.n >= 0) {
      // update
      if (f.parent_n < 0) {
        this.updateFeatureGroup(parents, f);
      } else {
        this.updateFeatureGroup(this.state.children, f);
      }
    } else {
      // create
      if (f.parent_n < 0) {
        this.createFeatureGroup(parents, f);
      } else {
        this.createFeatureGroup(this.state.children, f);
      }
    }
  }

  onDelete(f) {
    // console.log('onDelete');
    // console.log(f);
    if (f.parent_n < 0) {
      this.setState(...this.state, { selectedParentN: -1, children: [] });
      this.deleteFeatureGroup(parents, f);
    } else {
      this.deleteFeatureGroup(this.state.children, f);
    }
  }

  updateFeatureGroup(featureGroups, f) {
    const idx = findIndex(featureGroups, { n: f.n });
    featureGroups[idx].name = f.name;
  }

  deleteFeatureGroup(featureGroups, f) {
    remove(featureGroups, { n: f.n });
  }

  createFeatureGroup(featureGroups, f) {
    let featureMaxN = maxBy(featureGroups, 'n');
    if (featureMaxN === undefined) {
      featureMaxN = {
        n: 1,
      };
    }

    featureGroups.push({
      n: featureMaxN.n + 1,
      name: f.name,
      parent_n: f.parent_n,
      children: [],
    });
  }

  render() {
    return (
      <NavigationDrawer
        drawerTitle='react-md with CRA'
        toolbarTitle='Welcome to react-md'
      >
        <div className='md-grid'>
          <CardFeatureGroup
            title='Метагруппы'
            parent_n={-1}
            featureGroups={parents}
            onClick={this.onClickParent}
            onSave={this.onSave}
            onDelete={this.onDelete}
          />
          <CardFeatureGroup
            title='Подгруппы'
            parent_n={this.state.selectedParentN}
            featureGroups={this.state.children}
            onClick={() => {}}
            onSave={this.onSave}
            onDelete={this.onDelete}
          />
        </div>
      </NavigationDrawer>
    );
  }
}

export default FeatureGroupPage;
