import React from 'react';
import {
  TableRow,
  DataTable,
  TableBody,
  TableColumn } from 'react-md';

const Header = () => (
  <TableRow className='md-font-bold'>
    <TableColumn>Имя</TableColumn>
    <TableColumn>
      <DataTable plain>
        <TableBody>
          <TableRow>
            <TableColumn
              style={{ paddingLeft: 0 }}
            >Группа
            </TableColumn>
            <TableColumn
              numeric
              adjusted={false}
            >Всего вопросов
            </TableColumn>
            <TableColumn
              adjusted={false}
              numeric
            >Правильно
            </TableColumn>
          </TableRow>
        </TableBody>
      </DataTable>
    </TableColumn>
    <TableColumn numeric>Оценка,%</TableColumn>
  </TableRow>
);

export default Header;
