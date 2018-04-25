import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { number, string, arrayOf, shape, func } from 'prop-types';

import {
  Paper,
  SelectField,
  TextField,
  DataTable,
  TableBody,
} from 'react-md';

import * as ReportActions from '../../../actions/ReportActions';

import EmployeeRow from './EmployeeRow';
import Header from './Header';

const months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

class EmployeeFeatureGroupReport extends Component {
  static propTypes={
    params: shape({
      year: number,
      month: number,

    }),
    // Функция показа детализации по сотруднику, году, месяцу
    showDetail: func,
    actions: shape({
      // Функция загрузки новых данных, ри смене месяца, года
      buildReport: func,
    }),
    // Данные отчета
    data: arrayOf(shape({
      // Имя сотрудника
      employee_name: string,
      feature_groups: arrayOf(shape({
        // Название группы хар-к
        name: string,
        // Задано вопросов по группе хар-к
        qty_all: number,
        // равильных ответов по группе хар-к
        qty_ok: number,
      })),
      // Всего задано вопросов
      qty_all: number,
      // Всего правильных ответов
      qty_ok: number,
    })),
  }


  static defaultProps={
    params: {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
    },
    showDetail: () => {},
    actions: {
      buildReport: () => {},
    },
    data: [],
  }

  constructor(props) {
    super(props);
    this.state = {
      year: props.params.year,
      month: props.params.month,
    };
  }

  onChangeMonth=(value, idxMonth) => {
    const month = idxMonth + 1;
    this.setState({ month });
    this.buildReport(this.state.year, month);
  }

  onChangeYear=(year) => {
    this.setState({ year });
    this.buildReport(year, this.state.month);
  }

  buildReport=(year, month) => this.props.actions.buildReport('Отчет Сотрудники->Группы хар-к', { year, month })

  getRows=() => {
    if (this.props.data !== undefined) {
      return this.props.data.map(employeeData => (
        <EmployeeRow
          key={`${employeeData.employee_name}_data`}
          {...employeeData}
          onClick={this.showDetail}
        />));
    }
    return <div />;
  }

  showDetail=employeeName =>
    this.props.showDetail(employeeName, this.state.year, this.state.month)

  render() {
    return (
      <div className='md-grid'>
        <SelectField
          className='md-cell md-cell--1'
          id='field-month'
          label='Месяц'
          menuItems={months}
          defaultValue={months[this.props.params.month - 1]}
          simplifiedMenu={false}
          onChange={this.onChangeMonth}
        />
        <TextField
          id='txt-year'
          label='Год'
          className='md-cell md-cell--1'
          type='number'
          defaultValue={this.props.params.year}
          onChange={this.onChangeYear}
        />
        <Paper
          className='md-cell md-cell--12'
        >
          <DataTable plain>
            <TableBody>
              <Header key='header_employee_feature_group_report' />
              {this.getRows()}
            </TableBody>
          </DataTable>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = function (state) {
  // console.log('mapStateToProps');
  // console.log(state.report.report['Результаты опроса сотрудника']);
  return { ...state.report.report['Отчет Сотрудники->Группы хар-к'] };
};

const mapDispatchToProps = function (dispatch) {
  return {
    actions: bindActionCreators(ReportActions, dispatch),
  };
};

const ConnectedEmployeeFeatureGroupReport = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EmployeeFeatureGroupReport);
export { EmployeeFeatureGroupReport, ConnectedEmployeeFeatureGroupReport };

