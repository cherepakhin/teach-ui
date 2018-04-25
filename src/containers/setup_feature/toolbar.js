import React from 'react';
import Button from 'react-md/lib/Buttons';
import TextField from 'react-md/lib/TextFields';
import { CONST_ACTION } from '../../constants';

class SetupFeatureToolBar {
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
      this.props.actions.feature.filterFeatures(this.searchInput.value);
    }
  }

  getActions() {
    return [
      <Button
        key='btn_new_question'
        icon
        className='md-btn--toolbar'
        tooltipLabel='Добавить хар-ку'
        onClick={() => this.props.actions.openDlg(CONST_ACTION.DLG_EDIT_FEATURE, { featureGroups: this.props.featureGroup.featureGroups })}
      >
        add
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
      />,
      <TextField
        key='txt-sale-search-name'
        id='floatingCenterTitle'
        placeholder='найти по названию'
        className='md-select-field--toolbar md-select-field--toolbar'
        size={20}
        fullWidth={false}
        onKeyDown={this.handlerKeyPress}
        ref={(field) => {
          this.searchInput = field;
        }}
      />,
      <Button
        key='search'
        icon
        className='md-btn--toolbar'
        onClick={() => this.props.actions.feature.filterFeatures(this.searchInput.value)}
      >
      search
      </Button>,
    ];
  }

  // TODO: Не работает установка строки поиска из state
  getActionsAndChilds(_props) {
    this.props = _props;
    this.actions = this.getActions();
    /*    if (this.searchInput !== undefined && this.searchInput !== null && this.searchInput.getField() !== null) {
      this.searchInput.getField().value = this.searchName;
    }
*/
    this.childs = this.getChilds();
    return { actions: this.actions, childs: this.childs };
  }
}

export default new SetupFeatureToolBar();
