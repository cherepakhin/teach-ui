import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DataTable from 'react-md/lib/DataTables/DataTable';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';
import EditDialogColumn from 'react-md/lib/DataTables/EditDialogColumn';
import FontIcon from 'react-md/lib/FontIcons';
import * as SetupDepartmentActions from '../../actions/SetupDepartmentActions';

class SetupDepartmentPage extends React.Component {
  constructor(props) {
    super(props);
    this.remove = this.remove.bind(this);
    this.setSelectedDepartment = this.setSelectedDepartment.bind(this);
    this.save = this.save.bind(this);
    this.state = {
      selectedDepartment: {},
    };
  }

  setSelectedDepartment(department) {
    this.setState({ selectedDepartment: { ...department } });
  }

  getRows() {
    const rows = this.props.departments.map(department => (
      <TableRow
        key={`department-row-${department.n}`}
      >
        <EditDialogColumn
          id={`field_department_name${department.n}`}
          adjusted={false}
          className='md-text--theme-primary md-pointer--hover '
          tooltipLabel='Изменить'
          defaultValue={department.name}
          onChange={() => (this.setSelectedDepartment(department))}
          onOkClick={this.save}
        />
        <TableColumn
          id={`field_btn_delete_department${department.n}`}
          adjusted={false}
          className='md-pointer--hover '
          tooltipLabel='Удалить'
          onClick={() => this.remove(department)}
        ><FontIcon className='md-text--theme-secondary'>close</FontIcon>
        </TableColumn>

      </TableRow>
    ));
    return rows;
  }

  save(value) {
    console.log(this.state.selectedDepartment);
    const department = this.state.selectedDepartment;
    department.name = value;
    console.log(department);
    this.props.actions.save(department);
  }

  remove(department) {
    this.props.actions.remove(department);
  }

  render() {
    return (
      <DataTable
        baseId='table-departments'
        responsive
        className='md-cell md-cell--12-desktop md-cell--8-tablet md-cell--6-phone'
        plain
      >
        <TableHeader>
          <TableRow>
            <TableColumn adjusted={false}>Название</TableColumn>
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
  return { ...state.setupDepartment };
};

const mapDispatchToProps = function (dispatch) {
  return {
    actions: bindActionCreators(SetupDepartmentActions, dispatch),
  };
};


SetupDepartmentPage.propTypes = {
  departments: PropTypes.arrayOf(PropTypes.shape({
    n: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  actions: PropTypes.shape({
    remove: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired,
  }).isRequired,
};

const ConnectedSetupDepartmentPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SetupDepartmentPage);

export { SetupDepartmentPage, ConnectedSetupDepartmentPage };
