import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TableColumn from 'react-md/lib/DataTables/TableColumn';
import FontIcon from 'react-md/lib/FontIcons/FontIcon';

import ReportRow from '../ReportRow';

let props = {};
beforeEach(() => {
  configure({ adapter: new Adapter() });
  props = {
    employee_name: 'EMPLOYEE_1',
    qty: 2,
    results: [
      {
        ddate: '2018-03-30',
        qty: 1,
      },
      {
        ddate: '2018-03-31',
        qty: 1,
      },
    ],
    startDate: '2018-03-30',
    endDate: '2018-04-01',
    year: 2018,
    month: 3,
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
    const columns = row.find(TableColumn);
    expect(columns.at(0).props().children).toBe(props.employee_name);
  });

  it('Итог', () => {
    const row = shallow(<ReportRow {...props} />);
    const columns = row.find(TableColumn);
    expect(columns.at(2).props().children).toBe(props.qty);
  });

  // it('Колонка результатов', () => {
  //   const row = shallow(<ReportRow {...props} />);
  //   const icons = row.find('div');
  //   console.log(icons.at(0).children());
  //   console.log(icons.at(1).props());
  //   console.log(icons.at(2).props());
  //   expect(icons.length).toBe(2);
  //   expect(icons.at(0).props().children).toBe(1);
  //   expect(icons.at(1).props().children).toBe(1);
  // });
});
