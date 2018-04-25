import React from 'react';
import { SelectField } from 'react-md';
import { mapNameReportToURL } from '../../constants';

class ReportToolBar {
  constructor() {
    this.props = undefined;
    this.actions = [];
    this.childs = [];
    this.groups = [];
    // this.handlerKeyPress = this.handlerKeyPress.bind(this);
  }

  // handlerKeyPress(e) {
  //   if (e.key === 'Enter') {
  //     e.preventDefault();
  //   }
  // }

  getActions() {
    return [];
  }

  /**
 * Получение элементов ср.части toolbar
 * @param  {object} props - весь state
 * @return {array} - массив элементов toolbar
 */

  getMenuItems() {
    const menuItems = [];
    for (const report of mapNameReportToURL) {
      if (report[1].showInMenu === true) {
        menuItems.push(report[0]);
      }
    }
    return menuItems;
  }

  getChilds() {
    return [
      <div
        key='label'
        className='md-title--toolbar md-cell--1-offset md-cell--phone-hidden md-subheading-1'
      >
        Результаты
      </div>,
      <SelectField
        id='select-report-field'
        placeholder='Тип отчета'
        className='md-title--toolbar md-btn--toolbar'

        menuItems={this.getMenuItems()}
        simplifiedMenu={false}
        onChange={nameReport =>
          this.props.actions.report.buildReport(
            nameReport,
            { year: new Date().getFullYear(), month: new Date().getMonth() + 1 },
            )}
      />,
    ];
  }

  getActionsAndChilds(_props) {
    this.props = _props;
    this.actions = this.getActions();
    this.childs = this.getChilds();
    return { actions: this.actions, childs: this.childs };
  }
}

export default new ReportToolBar();
