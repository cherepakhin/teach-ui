import React, { PureComponent } from 'react';
import { number, string, arrayOf, shape, func } from 'prop-types';
import moment from 'moment';
import { find } from 'lodash';
import { TableRow, TableColumn, Button } from 'react-md';
import TooltipFontIcon from '../../../components/TooltipFontIcon';

class ReportRow extends PureComponent {
  static propTypes = {
    employee_name: string,
    results: arrayOf(shape({
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

    year: number,
    month: number,
    onClick: func,
  };

  static defaultProps={
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    employee_name: '',
    results: [],
    qty_all: 0,
    qty_ok: 0,
    onClick: () => {},
  }

  getRow=(startDate, endDate) => {
    const days = [];
    const countDays = moment(endDate).diff(startDate, 'days');
    if (countDays > 0) {
      for (let i = 0; i <= countDays; i++) {
        const day = new Date(this.props.year, this.props.month - 1, i + 2)
          .toISOString().slice(0, 10);
        const result = find(this.props.results, { ddate: day });
        // let icon = <FontIcon key={`icon_${this.props.employee_name + day}`} disabled>remove</FontIcon>;
        let icon = (<TooltipFontIcon
          key={`icon_${this.props.employee_name + day}`}
          tooltipLabel={i + 1}
          tooltipPosition='bottom'
          styleIcon={{ color: '#EEE' }}
        >remove
                    </TooltipFontIcon>);

        if (result !== undefined) {
          if (result.qty_ok === 0) {
            icon = (<TooltipFontIcon
              key={`icon_${this.props.employee_name + result.ddate}`}
              tooltipLabel={i + 1}
              tooltipPosition='bottom'
              styleIcon={{ color: 'red' }}
            >cancel
                    </TooltipFontIcon>);
          } else if (result.qty_all > result.qty_ok) {
            icon = (<TooltipFontIcon
              key={`icon_${this.props.employee_name + result.ddate}`}
              tooltipLabel={i + 1}
              tooltipPosition='bottom'
              styleIcon={{ color: 'yellow' }}
            >info
                    </TooltipFontIcon>);
          } else {
            icon = (<TooltipFontIcon
              key={`icon_${this.props.employee_name + result.ddate}`}
              tooltipLabel={i + 1}
              tooltipPosition='bottom'
              styleIcon={{ color: 'green' }}
            >check_circle
                    </TooltipFontIcon>);
          }
        }
        days.push(icon);
      }
    }
    return days;
  }

  render() {
    const startDate = new Date(this.props.year, this.props.month - 1, 2).toISOString().slice(0, 10);
    const endDate = new Date(this.props.year, this.props.month, 1).toISOString().slice(0, 10);
    return (
      <TableRow key={`row_${this.props.employee_name}`}>
        <TableColumn adjusted={false}>
          <Button
            onClick={() => this.props.onClick(this.props.employee_name)}
            flat
            primary
            tooltipLabel='Показать детально'
          >{this.props.employee_name}
          </Button>
        </TableColumn>
        <TableColumn>
          {
            this.getRow(startDate, endDate)
          }
        </TableColumn>
        <TableColumn adjusted={false}>
          {this.props.qty_all > 0 ? `${(this.props.qty_ok / this.props.qty_all) * 100 >> 0}%` : '0%'}
        </TableColumn>
      </TableRow>
    );
  }
}

export default ReportRow;
