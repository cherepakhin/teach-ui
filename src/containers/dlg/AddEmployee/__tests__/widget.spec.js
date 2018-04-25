import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import AddEmployeeDlg from '../widget';
import employees from '../../../../fixtures/employees.json';
import departments from '../../../../fixtures/departments.json';
import employee_groups from '../../../../fixtures/employee_groups.json';

let props = {};
beforeEach(() => {
  configure({ adapter: new Adapter() });
  props = {
    actions: {
      fnOk: jest.fn(),
      fnCancel: jest.fn(),
    },
    modalType: '',
    departments,
    employee_groups,
    employee: employees[0],
  };
});

describe('Test AddDepartmentDlg', () => {
  it('init', () => {
    const dlg = shallow(<AddEmployeeDlg {...props} />);
    expect(dlg.state().visible).toBe(true);
  });

  it('fnOk', () => {
    const dlg = mount(<AddEmployeeDlg {...props} />);
    dlg.instance().fnOk();
    expect(dlg.state().visible).toBe(false);
    expect(props.actions.fnOk.mock.calls.length).toBe(1);
    // console.log(props.actions.fnOk.mock.calls[0][0]);
    expect(props.actions.fnOk.mock.calls[0][0]).toEqual(employees[0]);
  });
});
