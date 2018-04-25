import React from 'react';
import Button from 'react-md/lib/Buttons';
import { CONST_ACTION } from '../../constants';

class SetupDepartmentToolBar {
  constructor() {
    this.props = undefined;
    this.actions = [];
    this.childs = [];
    this.groups = [];
  }

  getActions() {
    return [
      <Button
        key='btn_new_department'
        icon
        className='md-btn--toolbar'
        tooltipLabel='Новое подразделение'
        onClick={() => this.props.actions.openDlg(CONST_ACTION.DLG_ADD_DEPARTMENT, {})}
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
      >
      Подразделения
      </div>,
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

export default new SetupDepartmentToolBar();
