import React, { Component } from 'react';
import {
  Button,
  TableRow,
  DataTable,
  TableBody,
  TableColumn } from 'react-md';
import { string, number, arrayOf, shape, func } from 'prop-types';
import FeatureGroupRow from './FeatureGroupRow';

export default class EmployeeRow extends Component {
  static propTypes={
    employee_name: string,
    feature_groups: arrayOf(shape({
      name: string,
      qty_all: number,
      qty_ok: number,
    })),
    qty_all: number,
    qty_ok: number,
    onClick: func,
  }

  static defaultProps={
    employee_name: '',
    feature_groups: [],
    qty_all: 0,
    qty_ok: 0,
    onClick: () => {},
  }

  render() {
    const rows = this.props.feature_groups.map(featureGroupRow =>
      (<FeatureGroupRow
        key={`${this.props.employee_name}_${featureGroupRow.name}`}
        {...featureGroupRow}
      />));
    rows.push(<FeatureGroupRow
      className='md-font-bold'
      name='Итого:'
      qty_all={this.props.qty_all}
      qty_ok={this.props.qty_ok}
    />);
    return (
      <TableRow>
        <TableColumn >
          <Button
            onClick={() => this.props.onClick(this.props.employee_name)}
            flat
            primary
            tooltipLabel='Показать детально'
          >{this.props.employee_name}
          </Button>
        </TableColumn>
        <TableColumn>
          <DataTable plain>
            <TableBody>
              {
                this.props.feature_groups.map(featureGroupRow =>
                (<FeatureGroupRow
                  key={`${this.props.employee_name}_${featureGroupRow.name}`}
                  {...featureGroupRow}
                />))
              }
              <FeatureGroupRow
                className='md-font-bold'
                key={`Summary_${this.props.employee_name}`}
                name='Итого:'
                qty_all={this.props.qty_all}
                qty_ok={this.props.qty_ok}
              />
            </TableBody>
          </DataTable>
        </TableColumn>
        <TableColumn
          className='md-font-bold'
          numeric
        >{this.props.qty_all > 0 ? `${(this.props.qty_ok / this.props.qty_all) * 100 >> 0}%` : '0%'}
        </TableColumn>
      </TableRow>);
  }
}
