import React from 'react';

class QuestionToolBar {
  constructor() {
    this.props = undefined;
    this.actions = [];
    this.childs = [];
    this.groups = [];
  }

  getActions() {
    return [];
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
      Вход в программу
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

export default new QuestionToolBar();
