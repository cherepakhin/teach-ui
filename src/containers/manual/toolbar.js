import React from 'react';
import Button from 'react-md/lib/Buttons';
import TextField from 'react-md/lib/TextFields';

class ManualToolBar {
  constructor() {
    this.props = undefined;
    this.actions = [];
    this.childs = [];
    this.groups = [];
    this.handlerKeyPress = this.handlerKeyPress.bind(this);
  }

  handlerKeyPress(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.props.actions.manual.filterFeatures(this.searchInput.value);
    }
  }

  getActions() {
    return [
      <TextField
        key='txt-feature-search-name'
        id='txt-feature-search-name'
        placeholder='найти по названию'
        className='md-select-field--toolbar md-select-field--toolbar'
        size={20}
        fullWidth={false}
        onKeyDown={this.handlerKeyPress}
        defaultValue={this.props.manual.params.name}
        ref={(field) => {
          this.searchInput = field;
        }}
      />,
      <Button
        key='search'
        icon
        className='md-btn--toolbar'
        onClick={() => this.props.actions.manual.filterFeatures(this.searchInput.value)}
      >
      search
      </Button>,
    ];
  }

  /**
 * Получение элементов ср.части toolbar
 * @param  {object} props - весь state
 * @return {array} - массив элементов toolbar
 */
  getChilds() {
    return [
      <div
        key='label'
        className='md-title--toolbar md-cell--1-offset md-cell--phone-hidden'
      >
      Справочник хар-к
      </div>,
    ];
  }

  getActionsAndChilds(_props) {
    this.props = _props;
    this.searchName = _props.feature.searchName;
    this.actions = this.getActions();
    this.childs = this.getChilds();
    return { actions: this.actions, childs: this.childs };
  }
}

export default new ManualToolBar();
