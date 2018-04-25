import React from 'react';
import { func, bool, string } from 'prop-types';

const TitleFeatureGroup = props => (
  <div
    className='md-fake-btn md-pointer--hover md-fake-btn--no-outline md-list-tile md-text'
    role='button'
    aria-expanded='true'
    onClick={props.setCollapsed}
  >
    <div className='md-tile-content' onClick={props.setCollapsed}>
      <div className='md-tile-text--primary md-text--theme-primary'>{props.name}</div>
    </div>
    <div className='md-tile-addon md-tile-addon--icon' onClick={props.setCollapsed}>
      <i className='md-icon material-icons md-collapser md-collapser--flipped'>
        {props.colapsed ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
      </i>
    </div>
  </div>
);

TitleFeatureGroup.propTypes = {
  name: string,
  setCollapsed: func,
  colapsed: bool,
};

TitleFeatureGroup.defaultProps = {
  name: '',
  setCollapsed: () => {},
  colapsed: true,
};


export default TitleFeatureGroup;
