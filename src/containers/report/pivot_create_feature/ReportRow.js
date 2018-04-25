import React, { PureComponent } from 'react';
import { number, string, arrayOf, shape } from 'prop-types';
import moment from 'moment';
import { find } from 'lodash';
import { TableRow, TableColumn } from 'react-md';

class ReportRow extends PureComponent {
  static propTypes = {
    employee_name: string,
    results: arrayOf(shape({
      ddate: string,
      // Кол-во введенных хар-к
      qty: number,
    })),
    // Всего введенных хар-к
    qty: number,

    startDate: string,
    endDate: string,
    year: number,
    month: number,
  };

  static defaultProps={
    employee_name: '',
    results: [],
    qty: 0,
  };

  getRow=() => {
    const days = [];
    const countDays = moment(this.props.endDate).diff(this.props.startDate, 'days');
    if (countDays > 0) {
      for (let i = 0; i <= countDays; i++) {
        const day = new Date(this.props.year, this.props.month - 1, i + 2)
          .toISOString().slice(0, 10);
        const result = find(this.props.results, { ddate: day });
        const key = `icon_${this.props.employee_name + day}`;
        let icon = (<div
          key={key}
          className='md-text-center md-inline-block md-table-column--header'
          style={{ width: 20, height: 20 }}
        />);
        if (result !== undefined) {
          if (result.qty > 0) {
            icon = (<div
              id={key}
              key={key}
              className='md-text-center md-inline-block md-table-column--header'
              style={{ width: 20, height: 20, color: 'green' }}
            >{result.qty}
            </div>);
          }
        }
        days.push(icon);
      }
    }
    return days;
  }

  render() {
    return (
      <TableRow key={`row_${this.props.employee_name}`}>
        <TableColumn adjusted={false}>{this.props.employee_name}</TableColumn>
        <TableColumn>
          {
            this.getRow()
          }
        </TableColumn>
        <TableColumn adjusted={false} className='md-font--bold md-text-center'>
          {this.props.qty}
        </TableColumn>
      </TableRow>
    );
  }
}

export default ReportRow;
