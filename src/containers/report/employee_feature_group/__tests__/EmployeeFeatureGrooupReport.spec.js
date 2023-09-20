import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { EmployeeFeatureGroupReport } from '../index';
import data from './employee_feature_group.json';

configure({ adapter: new Adapter() });

describe('EmployeeFeatureGrooupReport', () => {
  it('Init. Check EmployeeRow', () => {
    const props = {
      data: [...data],
      params: {
        year: 2018,
        month: 3,
      },
    };
    const container = shallow(<EmployeeFeatureGroupReport {...props} />);
    const employeeRows = container.find('EmployeeRow');
    expect(employeeRows.length).toBe(2);
    expect(employeeRows.at(0).props().employee_name).toBe('NAME_1');
    expect(employeeRows.at(0).props().qty_all).toBe(2);
    expect(employeeRows.at(0).props().qty_ok).toBe(1);

    expect(employeeRows.at(1).props().employee_name).toBe('NAME_2');
    expect(employeeRows.at(1).props().qty_all).toBe(100);
    expect(employeeRows.at(1).props().qty_ok).toBe(30);
  });

  it('Init. Check SelectField. Month', () => {
    const props = {
      data: [...data],
      year: 2018,
      month: 3,
    };
    const container = mount(<EmployeeFeatureGroupReport {...props} />);
    const monthField = container.find('SelectField');
    // expect(monthField.props().defaultValue).toBe('Март');
  });

  it('Init. Check TextField. Year', () => {
    const props = {
      data: [...data],
      year: 2018,
      month: 3,
    };
    const container = mount(<EmployeeFeatureGroupReport {...props} />);
    const yearField = container.find('TextField');
    expect(yearField.props().defaultValue).toBe(2023);
  });

  it('Init. Check FeatureGroupRow', () => {
    const props = {
      data: [...data],
      params: {
        year: 2018,
        month: 3,
      },
    };
    const container = mount(<EmployeeFeatureGroupReport {...props} />);
    const featureGroupRows = container.find('FeatureGroupRow');
    expect(featureGroupRows.length).toBe(6);
    expect(featureGroupRows.at(0).props().name).toBe(null);
    expect(featureGroupRows.at(0).props().qty_all).toBe(1);
    expect(featureGroupRows.at(0).props().qty_ok).toBe(1);

    expect(featureGroupRows.at(1).props().name).toBe('GROUP_1');
    expect(featureGroupRows.at(1).props().qty_all).toBe(1);
    expect(featureGroupRows.at(1).props().qty_ok).toBe(0);
  });
});

