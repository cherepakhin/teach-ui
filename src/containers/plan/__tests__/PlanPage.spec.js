import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { PlanPage } from '../index';

let props = {
  plans: [],
  actions: {
    refresh: jest.fn(),
    save: jest.fn(),
  },
};

configure({ adapter: new Adapter() });

beforeEach(() => {
  props = {
    plans: [
      {
        n: 11,
        qty_work: 11,
        qty_question: 1111,
        employee: {
          n: 1,
          name: 'EMPLOYEE_1',
          department: {
            n: 1,
            name: 'DEPARTMENT_1',
          },
        },
      },
      {
        n: 22,
        qty_work: 22,
        qty_question: 2222,
        employee: {
          n: 2,
          name: 'EMPLOYEE_2',
          department: {
            n: 1,
            name: 'DEPARTMENT_1',
          },
        },
      },
    ],
    actions: {
      refresh: jest.fn(),
      save: jest.fn(),
    },
  };
});

describe('PlanPage', () => {
  it('Проверка заголовка', () => {
    props = {
      plans: [],
      actions: {
        refresh: jest.fn(),
        save: jest.fn(),
      },
    };
    const container = shallow(<PlanPage {...props} />);
    const sortedColumns = container.find('TableSortedColumn');
    expect(sortedColumns.length).toBe(4);

    expect(sortedColumns.at(0).props().label).toBe('Имя');
    expect(sortedColumns.at(0).props().field).toBe('employee.name');

    expect(sortedColumns.at(1).props().label).toBe('Подразделение');
    expect(sortedColumns.at(1).props().field).toBe('employee.department.name');

    expect(sortedColumns.at(2).props().label).toBe('К-во смен');
    expect(sortedColumns.at(2).props().field).toBe('qty_work');

    expect(sortedColumns.at(3).props().label).toBe('К-во вопросов');
    expect(sortedColumns.at(3).props().field).toBe('qty_question');
  });


  it('resort', () => {
    const container = shallow(<PlanPage {...props} />);
    // console.log(container.instance());
    container.instance().resort('qty_work', false);
    expect(container.state().sortColumn).toBe('qty_work');
    expect(container.state().sortASC).toBe(false);
  });

  it('Проверка содержимого 1 строка', () => {
    const container = shallow(<PlanPage {...props} />);
    const rows = container.find('TableBody TableRow');
    expect(rows.length).toBe(2);

    const row = rows.at(0).props().children;
    const plan = props.plans[0];
    expect(row[0].props.children).toBe(plan.employee.name);
    expect(row[1].props.children).toBe(plan.employee.department.name);
    // expect(row[2].props.children).toBe(plan.qty_work);
    // expect(row[3].props.children).toBe(formatNumber(plan.cost));
    const qtyField = rows.at(0).find('EditDialogColumn');
    expect(qtyField.at(0).props().defaultValue).toBe(plan.qty_work);
    expect(qtyField.at(1).props().defaultValue).toBe(plan.qty_question);
  });

  it('Проверка содержимого 2 строка', () => {
    const container = shallow(<PlanPage {...props} />);
    const rows = container.find('TableBody TableRow');
    expect(rows.length).toBe(2);

    const row = rows.at(1).props().children;
    const plan = props.plans[1];
    expect(row[0].props.children).toBe(plan.employee.name);
    expect(row[1].props.children).toBe(plan.employee.department.name);
    // expect(row[2].props.children).toBe(plan.qty_work);
    // expect(row[3].props.children).toBe(formatNumber(plan.cost));
    const qtyField = rows.at(1).find('EditDialogColumn');
    expect(qtyField.at(0).props().defaultValue).toBe(plan.qty_work);
    expect(qtyField.at(1).props().defaultValue).toBe(plan.qty_question);
  });
});
