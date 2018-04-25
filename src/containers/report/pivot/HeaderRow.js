import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import moment from 'moment';

class HeaderRow extends PureComponent {
  static propTypes = {
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
  };

  render() {
    const days = [];
    const startDate = new Date(this.props.year, this.props.month - 1, 2).toISOString().slice(0, 10);
    const endDate = new Date(this.props.year, this.props.month, 1).toISOString().slice(0, 10);

    const countDays = moment(endDate).diff(startDate, 'days');
    const startDay = moment(startDate).date();
    if (countDays > 0) {
      for (let i = 0; i <= countDays; i++) {
        const day = startDay + i;
        days.push(<div key={`header${day}`} style={{ width: 20, display: 'inline-block', textAlign: 'center' }}>{day}</div>);
      }
    }

    return (
      <TableHeader>
        <TableRow>
          <TableColumn
            className='prevent-grow'
            adjusted={false}
          >{'Имя'}
          </TableColumn>

          <TableColumn>
            {days}
          </TableColumn>
          <TableColumn
            className='prevent-grow'
            adjusted={false}
          >{'Итог'}
          </TableColumn>

        </TableRow>
      </TableHeader>
    );
  }
}

export default HeaderRow;
