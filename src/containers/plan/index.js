import React from 'react';
import PropTypes, { number, string, shape, func } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { orderBy } from 'lodash';


import {
  DataTable,
  TableHeader,
  TableRow,
  TableBody,
  TableColumn,
  EditDialogColumn,
} from 'react-md';
import TableSortedColumn from '../../components/TableSortedColumn';

import * as PlanActions from '../../actions/PlanActions';

class PlanPage extends React.Component {
  static propTypes={
    plans: PropTypes.arrayOf(shape({
      n: number,
      employee: shape({
        n: number,
        name: string,
        department: shape({
          n: number,
          name: string,
        }),
      }),
      qty_work: number,
      qty_question: number,
    })).isRequired,
    actions: PropTypes.shape({
      refresh: func,
      save: func,
    }).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      sortColumn: 'employee.name',
      sortASC: true,
    };
  }

  componentWillMount=() => {
    this.props.actions.refresh();
  }

  onChangeQtyWork =(plan, qty) => {
    const _plan = { ...plan };
    _plan.qty_work = qty;
    this.props.actions.save(_plan);
  }

  onChangeQtyQuestion =(plan, qty) => {
    // console.log(plan, qty);
    const _plan = { ...plan };
    _plan.qty_question = qty;
    this.props.actions.save(_plan);
  }

  getRows() {
    const rows = orderBy(this.props.plans, this.state.sortColumn, [this.state.sortASC ? 'asc' : 'desc']).map(plan => (
      <TableRow
        key={`employee-row-${plan.n}`}
      >
        <TableColumn>{plan.employee.name}</TableColumn>
        <TableColumn>{plan.employee.department.name}</TableColumn>
        <EditDialogColumn
          id={`field_edit_price_${plan.n}_qty_work`}
          defaultValue={plan.qty_work}
          type='number'
          onOkClick={qty => this.onChangeQtyWork(plan, qty)}
          className='md-text--theme-primary md-pointer--hover'
        />
        <EditDialogColumn
          id={`field_edit_price_${plan.n}_qty_question`}
          defaultValue={plan.qty_question}
          type='number'
          onOkClick={qty => this.onChangeQtyQuestion(plan, qty)}
          className='md-text--theme-primary md-pointer--hover'
        />
      </TableRow>
    ));
    return rows;
  }

  resort=(sortColumn, sortASC) => this.setState({ sortColumn, sortASC });

  render() {
    return (
      <DataTable
        baseId='table-plan'
        responsive
        className='md-cell md-cell--12-desktop md-cell--8-tablet md-cell--6-phone'
        plain
      >
        <TableHeader>
          <TableRow>
            <TableSortedColumn
              field='employee.name'
              label='Имя'
              sortFn={this.resort}
              currentSort={this.state.sortColumn}
            />
            <TableSortedColumn
              field='employee.department.name'
              label='Подразделение'
              sortFn={this.resort}
              currentSort={this.state.sortColumn}
            />
            <TableSortedColumn
              field='qty_work'
              label='К-во смен'
              sortFn={this.resort}
              currentSort={this.state.sortColumn}
            />
            <TableSortedColumn
              field='qty_question'
              label='К-во вопросов'
              sortFn={this.resort}
              currentSort={this.state.sortColumn}
            />
          </TableRow>
        </TableHeader>
        <TableBody>
          {this.getRows()}
        </TableBody>
      </DataTable>);
  }
}

const mapStateToProps = function (state) {
  return { ...state.plan };
};

const mapDispatchToProps = function (dispatch) {
  return {
    actions: bindActionCreators(PlanActions, dispatch),
  };
};


const ConnectedPlanPage = connect(mapStateToProps, mapDispatchToProps)(PlanPage);
export { PlanPage, ConnectedPlanPage };
