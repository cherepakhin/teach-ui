import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { number, string, arrayOf, shape, func } from 'prop-types';
import { DataTable, TableBody, SelectField, TextField } from 'react-md';

import * as ReportActions from '../../../actions/ReportActions';
import HeaderRow from './HeaderRow';
import ReportRow from './ReportRow';
import { months } from '../../../constants';

class PivotCreateFeatureReportPage extends React.Component {
  static propTypes={
    params: shape({
      year: number,
      month: number,

    }),
    // Функция загрузки новых данных, ри смене месяца, года
    actions: shape({
      // Функция загрузки новых данных, ри смене месяца, года
      buildReport: func,
    }),
    // Данные отчета
    data: arrayOf(shape({
      // Имя сотрудника
      employee_name: string,
      results: arrayOf(shape({
        // Дата
        ddate: string,
        // Кол-во введенных хар-к
        qty: number,
      })),
      // Всего введенных хар-к
      qty: number,
    })),
  }

  static defaultProps={
    params: {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
    },
    data: [],
    actions: {
      buildReport: () => {},
    },
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


  buildReport=(year, month) => this.props.actions.buildReport('Ввод новых хар-к', { year, month })

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
          <HeaderRow startDate={this.state.startDate} endDate={this.state.endDate} />
          <TableBody>
            {this.props.data.map(reportRow =>
              (<ReportRow
                key={`report_row_${reportRow.employee_name}`}
                {...reportRow}
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                year={this.props.params.year}
                month={this.props.params.month}
              />))}
          </TableBody>
        </DataTable>
      </div>
    );
  }
}

const mapStateToProps = function (state) {
  return { ...state.report.report['Ввод новых хар-к'] };
};

const mapDispatchToProps = function (dispatch) {
  return {
    actions: bindActionCreators(ReportActions, dispatch),
  };
};

const ConnectedPivotCreateFeatureReportPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PivotCreateFeatureReportPage);
export { PivotCreateFeatureReportPage, ConnectedPivotCreateFeatureReportPage };
