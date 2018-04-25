import React from 'react';
import Button from 'react-md/lib/Buttons';
import { CONST_ACTION, months } from '../../constants';

class PlanToolBar {
  constructor() {
    this.props = undefined;
    this.actions = [];
    this.childs = [];
    this.groups = [];
  }

  getActions() {
    return [
      <Button
        key='btn_find_plan'
        icon
        className='md-btn--toolbar'
        tooltipLabel='Показать другой план'
        onClick={() => this.props.actions.openDlg(CONST_ACTION.DLG_CHANGE_PLAN, {
          year: this.props.plan.year,
          month: this.props.plan.month,
        })}
      >
        swap_horiz
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
        {`Планы ${months[this.props.plan.month - 1]} ${this.props.plan.year}`}
      </div>,
    ];
  }

  // TODO: Не работает установка строки поиска из state
  getActionsAndChilds(_props) {
    this.props = _props;
    this.actions = this.getActions();
    this.childs = this.getChilds();
    return { actions: this.actions, childs: this.childs };
  }
}

export default new PlanToolBar();
