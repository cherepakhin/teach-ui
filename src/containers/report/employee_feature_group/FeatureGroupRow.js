import React from 'react';
import { string, number } from 'prop-types';
import {
  TableRow,
  TableColumn } from 'react-md';

const FeatureGroupRow = (props) => {
  const className = props.className !== undefined ? props.className : '';
  return (<TableRow>
    <TableColumn
      style={{ paddingLeft: 0 }}
      className={className}
    >{props.name}
    </TableColumn>
    <TableColumn
      numeric
      adjusted={false}
      className={className}
    >{props.qty_all}
    </TableColumn>
    <TableColumn
      adjusted={false}
      numeric
      className={className}
    >{props.qty_ok}
    </TableColumn>
  </TableRow>);
};

FeatureGroupRow.propTypes = {
  name: string,
  qty_all: number,
  qty_ok: number,
};

export default FeatureGroupRow;
