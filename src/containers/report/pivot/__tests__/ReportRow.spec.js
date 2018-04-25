import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { TableColumn, Button } from 'react-md';
import TooltipFontIcon from '../../../../components/TooltipFontIcon';

import ReportRow from '../ReportRow';

configure({ adapter: new Adapter() });

let props = {};
const year = new Date().getFullYear();
const month = new Date().getMonth() + 1;
const today = new Date(year, month - 1, 2).toISOString().slice(0, 10);
const tomorrow = new Date(year, month - 1, 3).toISOString().slice(0, 10);

beforeEach(() => {
  props = {
    employee_name: 'NAME1',
    results: [
      {
        ddate: today,
        qty_all: 1,
        qty_ok: 1,
      },
      {
        ddate: tomorrow,
        qty_all: 1,
        qty_ok: 0,
      },
    ],
    qty_all: 2,
    qty_ok: 1,
    summary: '50%',
    year,
    month,
  };
});

describe('ReportRow', () => {
  it('Проверка кол-ва колонок', () => {
    const row = shallow(<ReportRow {...props} />);
    const columns = row.find(TableColumn);
    // console.log(divs.length);
    expect(columns.length).toBe(3);
    // let day = 2;
    // divs.forEach((div) => {
    //   expect(div.props().children).toBe(day);
    //   day += 1;
    // });
  });

  it('Имя сотрудника', () => {
    const row = shallow(<ReportRow {...props} />);
    const columns = row.find(Button);
    expect(columns.at(0).props().children).toBe(props.employee_name);
  });

  it('Итог', () => {
    const row = shallow(<ReportRow {...props} />);
    const columns = row.find(TableColumn);
    expect(columns.at(2).props().children).toBe(props.summary);
  });

  it('Колонка результатов', () => {
    const row = shallow(<ReportRow {...props} />);
    const icons = row.find(TooltipFontIcon);
    expect(icons.length).toBeGreaterThan(27);
    expect(icons.at(0).props().children).toBe('check_circle');
    expect(icons.at(1).props().children).toBe('cancel');
  });
});
