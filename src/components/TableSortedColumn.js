import React from 'react';
import PropTypes from 'prop-types';
import TableColumn from 'react-md/lib/DataTables/TableColumn';
import FontIcon from 'react-md/lib/FontIcons';

class TableSortedColumn extends React.Component {
  constructor(props) {
    super(props);

    this.sort = this.sort.bind(this);
    this.state = {
      sortASC: true,
    };
  }

  sort() {
    this.setState({ sortASC: !this.state.sortASC });
    this.props.sortFn(this.props.field, this.state.sortASC);
  }

  render() {
    const {
      sortFn, currentSort, field, ...rest
    } = this.props;
    return (<TableColumn
      {...rest}
      sorted={this.props.currentSort === this.props.field ? true : undefined}
      // sortIconChildren={this.state.sortASC ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
      sortIcon={this.state.sortASC ? <FontIcon>keyboard_arrow_up</FontIcon> : <FontIcon>keyboard_arrow_down</FontIcon>}
      onClick={this.sort}
      className={`${this.props.className} md-pointer--hover`}
    >{this.props.label}
    </TableColumn>
    );
  }
}

TableSortedColumn.propTypes = {
  label: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  currentSort: PropTypes.string.isRequired,
  sortFn: PropTypes.func.isRequired,
};

export default TableSortedColumn;
