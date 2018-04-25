import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { SetupEmployeePage } from '../../setup_employee';
import employees from '../../../fixtures/employees.json';
import departments from '../../../fixtures/departments.json';
import employee_groups from '../../../fixtures/employee_groups.json';

let props = {};

beforeEach(() => {
  configure({ adapter: new Adapter() });
  props = {
    actions: {
      remove: jest.fn(),
      save: jest.fn(),
    },
    employees,
    departments,
    employee_groups,
    openDlg: jest.fn(),
  };
});

describe('Test SetupEmployeePage', () => {
  it('init', () => {
    const page = mount(<SetupEmployeePage {...props} />);

    const rows = page.find('TableRow');
    expect(rows.length).toBe(employees.length + 1); // +1 т.к. еще заголовок

    let columns = rows.at(1).find('TableColumn');
    expect(columns.at(0).props().children).toBe(employees[0].name);
    expect(columns.at(1).props().children).toBe(employees[0].department.name);
    expect(columns.at(2).props().children).toBe(employees[0].employee_group.name);

    columns = rows.at(2).find('TableColumn');
    expect(columns.at(0).props().children).toBe(employees[1].name);
    expect(columns.at(1).props().children).toBe(employees[1].department.name);
    expect(columns.at(2).props().children).toBe(employees[1].employee_group.name);
  });
});
