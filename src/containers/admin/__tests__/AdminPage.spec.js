import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import AdminPage from '../../admin';
import { history } from '../../../store';

beforeEach(() => {
  configure({ adapter: new Adapter() });
});

describe('AdminPage', () => {
  it('click на Button Подразделения', () => {
    const page = shallow(<AdminPage />);
    const btn = page.find('#setup_department_btn');
    expect(btn).toBeDefined();
    btn.simulate('click');
    expect(history.location.pathname).toBe('/setup_department');
  });

  it('click на Button Сотрудники', () => {
    const page = shallow(<AdminPage />);
    const btn = page.find('#setup_employee_btn');
    expect(btn).toBeDefined();
    btn.simulate('click');
    expect(history.location.pathname).toBe('/setup_employee');
  });

  it('click на Button Характеристик', () => {
    const page = shallow(<AdminPage />);
    const btn = page.find('#setup_feature_btn');
    expect(btn).toBeDefined();
    btn.simulate('click');
    expect(history.location.pathname).toBe('/setup_feature');
  });

  it('click на Button Группы характеристик', () => {
    const page = shallow(<AdminPage />);
    const btn = page.find('#setup_feature_group_btn');
    expect(btn).toBeDefined();
    btn.simulate('click');
    expect(history.location.pathname).toBe('/setup_feature_group');
  });
});
