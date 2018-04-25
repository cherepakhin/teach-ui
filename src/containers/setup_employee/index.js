import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { orderBy } from 'lodash';

import DataTable from 'react-md/lib/DataTables/DataTable';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';
import FontIcon from 'react-md/lib/FontIcons';
import TableSortedColumn from '../../components/TableSortedColumn';

import * as SetupEmployeeActions from '../../actions/SetupEmployeeActions';
import openDlg from '../../actions/ModalActions';
import { CONST_ACTION } from '../../constants';

class SetupEmployeePage extends React.Component {
  constructor(props) {
    super(props);
    this.remove = this.remove.bind(this);
    this.edit = this.edit.bind(this);
    this.resort = this.resort.bind(this);
    this.state = {
      sortColumn: 'name',
      sortASC: true,
    };
  }

  getRows() {
    const rows = orderBy(this.props.employees, this.state.sortColumn, [this.state.sortASC ? 'asc' : 'desc']).map(employee => (
      <TableRow
        key={`employee-row-${employee.n}`}
      >
        <TableColumn>{employee.name}</TableColumn>
        <TableColumn>{employee.department.name}</TableColumn>
        <TableColumn>{employee.employee_group.name}</TableColumn>
        <TableColumn
          id={`field_btn_change_employee${employee.n}`}
          adjusted
          className='md-pointer--hover '
          tooltipLabel='Изменить'
          onClick={() => this.props.openDlg(CONST_ACTION.DLG_ADD_EMPLOYEE, {
              employee,
              departments: this.props.departments,
              employee_groups: this.props.employee_groups,
          })}
          style={{ paddingRight: 0 }}
        ><FontIcon className='md-text--theme-secondary'>mode_edit</FontIcon>
        </TableColumn>
        <TableColumn
          id={`field_btn_delete_employee${employee.n}`}
          adjusted={false}
          className='md-pointer--hover '
          tooltipLabel='Удалить'
          style={{ paddingRight: 0 }}
          onClick={() => this.remove(employee)}
        ><FontIcon className='md-text--theme-secondary'>close</FontIcon>
        </TableColumn>

      </TableRow>
    ));
    return rows;
  }

  resort(sortColumn, sortASC) {
    this.setState(...this.state, { sortColumn, sortASC });
  }

  edit(employee) {
    console.log(employee);
    this.props.openDlg(CONST_ACTION.DLG_ADD_EMPLOYEE, {
      employee,
      departments: this.props.departments,
      employee_groups: this.props.employee_groups,
    });
  }

  remove(employee) {
    this.props.actions.remove(employee);
  }

  render() {
    return (
      <DataTable
        baseId='table-employees'
        responsive
        className='md-cell md-cell--12-desktop md-cell--8-tablet md-cell--6-phone'
        plain
      >
        <TableHeader>
          <TableRow>
            <TableSortedColumn
              field='name'
              label='Имя'
              sortFn={this.resort}
              currentSort={this.state.sortColumn}
            />
            <TableSortedColumn
              field='department.name'
              label='Подразделение'
              sortFn={this.resort}
              currentSort={this.state.sortColumn}
            />
            <TableSortedColumn
              field='employee_group.name'
              label='Права в программе'
              sortFn={this.resort}
              currentSort={this.state.sortColumn}
            />
            <TableColumn adjusted={false} />
            <TableColumn adjusted={false} />
          </TableRow>
        </TableHeader>
        <TableBody>
          {this.getRows()}
        </TableBody>
      </DataTable>);
  }
}

const mapStateToProps = function (state) {
  return { ...state.setupEmployee, departments: [...state.setupDepartment.departments] };
};

const mapDispatchToProps = function (dispatch) {
  return {
    actions: bindActionCreators(SetupEmployeeActions, dispatch),
    openDlg: bindActionCreators(openDlg, dispatch),
  };
};


SetupEmployeePage.propTypes = {
  departments: PropTypes.arrayOf(PropTypes.shape({
    n: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  employee_groups: PropTypes.arrayOf(PropTypes.shape({
    n: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  employees: PropTypes.arrayOf(PropTypes.shape({
    n: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    employee_group: PropTypes.shape({
      n: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  })).isRequired,
  actions: PropTypes.shape({
    remove: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired,
  }).isRequired,
  openDlg: PropTypes.func.isRequired,
};

const ConnectedSetupEmployeePage = connect(mapStateToProps, mapDispatchToProps)(SetupEmployeePage);
export { SetupEmployeePage, ConnectedSetupEmployeePage };
