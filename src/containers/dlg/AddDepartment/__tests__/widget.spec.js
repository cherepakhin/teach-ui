import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import AddDepartmentDlg from '../widget';

let props = {};
beforeEach(() => {
  configure({ adapter: new Adapter() });
  props = {
    actions: {
      fnOk: jest.fn(),
      fnCancel: jest.fn(),
    },
    modalType: '',
  };
});

describe('Test AddDepartmentDlg', () => {
  it('init', () => {
    const dlg = shallow(<AddDepartmentDlg {...props} />);
    expect(dlg.state().visible).toBe(true);
  });

  it('fnOk', () => {
    const dlg = mount(<AddDepartmentDlg {...props} />);
    dlg.instance().fnOk();
    expect(dlg.state().visible).toBe(false);
    expect(props.actions.fnOk.mock.calls.length).toBe(1);
  });
});
