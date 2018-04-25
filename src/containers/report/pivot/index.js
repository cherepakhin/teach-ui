import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { number, string, arrayOf, shape, func } from 'prop-types';
import { DataTable, TableBody, SelectField, TextField } from 'react-md';

import * as ReportActions from '../../../actions/ReportActions';
import HeaderRow from './HeaderRow';
import ReportRow from './ReportRow';
import { months } from '../../../constants';

class PivotReportPage extends React.Component {
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
      results: arrayOf(shape({
        // Название группы хар-к
        ddate: string,
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
      startDate: new Date(this.props.params.year, this.props.params.month - 1, 2).toISOString().slice(0, 10),
      endDate: new Date(this.props.params.year, this.props.params.month, 1).toISOString().slice(0, 10),
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

  showDetail=employeeName =>
    this.props.showDetail(employeeName, this.state.year, this.state.month)

  buildReport=(year, month) => this.props.actions.buildReport('Сводный отчет', { year, month })

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
        <DataTable
          baseId='docs'
          className='md-cell md-cell--12-desktop md-cell--8-tablet md-cell--6-phone'
          plain
        >
          <HeaderRow
            year={this.props.params.year}
            month={this.props.params.month}
          />
          <TableBody>
            {this.props.data.map(reportRow =>
              (<ReportRow
                key={`report_row_${reportRow.employee_name}`}
                {...reportRow}
                year={this.props.params.year}
                month={this.props.params.month}
                onClick={this.showDetail}
              />))}
          </TableBody>
        </DataTable>
      </div>
    );
  }
}

const mapStateToProps = function (state) {
  return { ...state.report.report['Сводный отчет'] };
};

const mapDispatchToProps = function (dispatch) {
  return {
    actions: bindActionCreators(ReportActions, dispatch),
  };
};

const ConnectedPivotReportPage = connect(mapStateToProps, mapDispatchToProps)(PivotReportPage);
export { PivotReportPage, ConnectedPivotReportPage };
