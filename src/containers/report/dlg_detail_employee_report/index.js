import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { bool, arrayOf, shape, number, string, func } from 'prop-types';
import { orderBy } from 'lodash';
import {
  Button,
  DialogContainer,
  Toolbar,
  DataTable,
  TableBody,
  TableColumn,
  TableRow,
  TableHeader,
  FontIcon,
} from 'react-md';
import * as ReportActions from '../../../actions/ReportActions';
import { formatDate } from '../../../util';
import TableSortedColumn from '../../../components/TableSortedColumn';

class DlgDetailEmployeeReport extends PureComponent {
  static propTypes = {
    visible: bool,
    data: arrayOf(shape({
      n: number,
      ddate: string,
      question: string,
      feature_groups: arrayOf(shape({
        name: string,
      })),
      is_correct: bool,
    })),
    hideDetail: func,
  };

  static defaultProps={
    visible: false,
    data: [],
    hideDetail: () => {},
  }

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      sortColumn: 'ddate',
      sortASC: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ visible: nextProps.visible });
  }

  resort=(sortColumn, sortASC) => this.setState({ sortColumn, sortASC });

  render() {
    return (
      <DialogContainer
        id='dlg_detail_employee_report'
        visible={this.state.visible}
        fullPage
        aria-labelledby='dlg_detail_employee_report-title'
      >
        <Toolbar
          fixed
          colored
          title='Детализация опроса'
          titleId='dlg_detail_employee_report-title'
          nav={<Button icon onClick={this.props.hideDetail}>close</Button>}
        />
        <section className='md-toolbar-relative'>
          <DataTable plain>
            <TableHeader>
              <TableRow>
                <TableSortedColumn
                  field='ddate'
                  label='Дата'
                  sortFn={this.resort}
                  currentSort={this.state.sortColumn}
                />
                <TableSortedColumn
                  field='question.feature.name'
                  label='Характеристика'
                  sortFn={this.resort}
                  currentSort={this.state.sortColumn}
                />
                <TableSortedColumn
                  field='question.txt'
                  label='Заданный вопрос'
                  sortFn={this.resort}
                  currentSort={this.state.sortColumn}
                />
                <TableSortedColumn
                  field='is_correct'
                  label='Результат'
                  sortFn={this.resort}
                  currentSort={this.state.sortColumn}
                />
                <TableSortedColumn
                  field='duration'
                  label='Время ответа'
                  sortFn={this.resort}
                  currentSort={this.state.sortColumn}
                />
              </TableRow>
            </TableHeader>
            <TableBody>
              {
               orderBy(this.props.data, this.state.sortColumn, [this.state.sortASC ? 'asc' : 'desc']).map(result => (
                 <TableRow key={`row_result_${result.n}`}>
                   <TableColumn >{formatDate(result.ddate)}</TableColumn >
                   <TableColumn >{result.question.feature.name}</TableColumn >
                   <TableColumn >{result.question.txt}</TableColumn >
                   <TableColumn >
                     <FontIcon style={{ color: result.is_correct ? 'green' : 'red' }}>{result.is_correct ? 'done' : 'clear'}</FontIcon>
                   </TableColumn>
                   <TableColumn>{result.duration}</TableColumn>
                 </TableRow>))
              }
            </TableBody>
          </DataTable>
        </section>
      </DialogContainer>);
  }
}

const mapStateToProps = function (state) {
  // console.log('mapStateToProps');
  // console.log(state.report.report['Результаты опроса сотрудника']);
  return { ...state.report.report['Результаты опроса сотрудника'] };
};

const mapDispatchToProps = function (dispatch) {
  return {
    actions: bindActionCreators(ReportActions, dispatch),
  };
};

const ConnectedDlgDetailEmployeeReport = connect(mapStateToProps, mapDispatchToProps)(DlgDetailEmployeeReport);
export { DlgDetailEmployeeReport, ConnectedDlgDetailEmployeeReport };
