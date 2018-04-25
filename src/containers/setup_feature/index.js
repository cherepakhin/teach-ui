import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DataTable from 'react-md/lib/DataTables/DataTable';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';
import TablePagination from 'react-md/lib/DataTables/TablePagination';
import FontIcon from 'react-md/lib/FontIcons';
import { orderBy } from 'lodash';
import { CONST_ACTION } from '../../constants';
import openDlg from '../../actions/ModalActions';
import { remove, changePage } from '../../actions/SetupFeatureActions';
import { formatDate } from '../../util';
import TableSortedColumn from '../../components/TableSortedColumn';

class SetupFeaturePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortColumn: 'name',
      sortASC: true,
    };
  }

  getRows() {
    const rows = orderBy(this.props.features, this.state.sortColumn, [this.state.sortASC ? 'asc' : 'desc']).map(feature => (
      <TableRow
        key={`feature-row-${feature.n}`}
      >
        <TableColumn
          id={`field_edit_feature_${feature.n}`}
          className='md-text--theme-primary md-pointer--hover '
          tooltipLabel='Изменить'
          adjusted={false}
          onClick={() => this.editFeature(feature)}
        >
          {feature.name}
        </TableColumn>
        <TableColumn
          id={`field_feature_employee_name_${feature.n}`}
          adjusted={false}
        >
          {feature.employee.name}
        </TableColumn>
        <TableColumn
          id={`field_feature_ddate_${feature.n}`}
          adjusted={false}
        >
          {formatDate(feature.ddate)}
        </TableColumn>

        <TableColumn
          id={`deleteBtn${feature.n}`}
          className='md-pointer--hover '
          tooltipLabel='Удалить'
          adjusted={false}
          onClick={() => this.deleteFeatureClick(feature)}
        ><FontIcon className='md-text--theme-secondary'>close</FontIcon>
        </TableColumn>
      </TableRow>
    ));
    return rows;
  }

  // componentDidMount() {
  //   console.log('componentDidMount');
  // }

  deleteFeatureClick=feature => this.props.actions.remove(feature.n);

  editFeature=feature =>
    this.props.actions.openDlg(CONST_ACTION.DLG_EDIT_FEATURE, { feature, featureGroups: this.props.featureGroups });


  changePage=(startRow, rowsPerPage) => this.props.actions.changePage(startRow, rowsPerPage);

  resort=(sortColumn, sortASC) => this.setState({ sortColumn, sortASC });

  render() {
    return (
      <DataTable
        baseId='table-feature'
        responsive
        className='md-cell md-cell--12-desktop md-cell--8-tablet md-cell--6-phone'
        plain
      >
        <TablePagination
          rows={this.props.countRows}
          rowsPerPage={this.props.params.rowsPerPage}
          rowsPerPageLabel='Строк на страницу'
          onPagination={this.changePage}
          page={(this.props.params.startRow / this.props.params.rowsPerPage) + 1}
        />
        <TableHeader>
          <TableRow>
            <TableSortedColumn
              field='name'
              label='Характеристика'
              sortFn={this.resort}
              currentSort={this.state.sortColumn}
            />
            <TableSortedColumn
              field='employee.name'
              label='Изменил'
              sortFn={this.resort}
              currentSort={this.state.sortColumn}
            />
            <TableSortedColumn
              field='ddate'
              label='Дата'
              sortFn={this.resort}
              currentSort={this.state.sortColumn}
            />
            <TableColumn adjusted={false} />
          </TableRow>
        </TableHeader>
        <TableBody>
          {this.getRows()}
        </TableBody>
      </DataTable>
    );
  }
}

const mapStateToProps = function (state) {
  return { ...state.feature, ...state.featureGroup };
};

const mapDispatchToProps = function (dispatch) {
  return {
    actions: {
      openDlg: bindActionCreators(openDlg, dispatch),
      remove: bindActionCreators(remove, dispatch),
      changePage: bindActionCreators(changePage, dispatch),
    },
  };
};

SetupFeaturePage.propTypes = {
  countRows: PropTypes.number.isRequired,
  featureGroups: PropTypes.arrayOf(PropTypes.shape({
    n: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  features: PropTypes.arrayOf(PropTypes.shape({
    n: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    info_profit: PropTypes.string.isRequired,
  })).isRequired,
  params: PropTypes.shape({
    rowsPerPage: PropTypes.number.isRequired,
    startRow: PropTypes.number.isRequired,
  }).isRequired,
  actions: PropTypes.shape({
    openDlg: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    changePage: PropTypes.func.isRequired,
  }).isRequired,
};

const ConnectedSetupFeaturePage = connect(mapStateToProps, mapDispatchToProps)(SetupFeaturePage);
export { SetupFeaturePage, ConnectedSetupFeaturePage };
