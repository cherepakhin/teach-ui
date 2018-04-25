import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ChangePlanDlg from '../widget';

let props = {};
beforeEach(() => {
  configure({ adapter: new Adapter() });
  props = {
    year: 2018,
    month: 3,
    visible: true,
    actions: {
      fnOk: jest.fn(),
      fnCancel: jest.fn(),
    },
    modalType: '',
  };
});

describe('Test ChangePlanDlg', () => {
  it('init', () => {
    const dlg = shallow(<ChangePlanDlg {...props} />);
    expect(dlg.state().visible).toBe(true);
  });

  it('fnOk', () => {
    const dlg = mount(<ChangePlanDlg {...props} />);
    dlg.instance().fnOk();
    expect(dlg.state().visible).toBe(false);
    expect(props.actions.fnOk.mock.calls.length).toBe(1);
    expect(props.actions.fnOk.mock.calls[0][0]).toBe(props.year);
  });
});
