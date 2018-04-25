import React from 'react';
import PropTypes from 'prop-types';

import Dialog from 'react-md/lib/Dialogs';
import TextField from 'react-md/lib/TextFields';
import Button from 'react-md/lib/Buttons/Button';
import Toolbar from 'react-md/lib/Toolbars';
import SelectField from 'react-md/lib/SelectFields';
import { find } from 'lodash';

import AWidgetDlg from '../AWidgetDlg';

export default class AddEmployeeDlg extends AWidgetDlg {
  constructor(props) {
    super(props);
    // console.log(props);
    this.fnOk = this.fnOk.bind(this);
    this.hide = this.hide.bind(this);
    let employee = {
      n: -1,
      name: '',
      password: '',
      department: props.departments[0],
      employee_group: props.employee_groups[0],
    };
    if (props.employee !== undefined) {
      employee = { ...props.employee };
    }
    this.state = {
      visible: true,
      employee,
      departments: { ...props.departments },
      employee_groups: { ...props.employee_groups },
    };
  }

  hide() {
    this.setState({ visible: false });
  }

  fnOk() {
    this.hide();
    // console.log(this.departmentField.value);
    const department = find(this.props.departments, { name: this.departmentField.value });
    const employee_group = find(this.props.employee_groups, { name: this.employeeGroupField.value });
    const employee = { ...this.state.employee };
    employee.department = department;
    employee.employee_group = employee_group;
    employee.name = this.nameField.value;
    employee.password = this.passwordField.value;
    this.props.actions.fnOk(employee);
  }

  render() {
    const nav = <Button icon onClick={this.handleCancel}>close</Button>;
    const action = (<Button
      raised
      primary
      onClick={this.fnOk}
    >Сохранить
                    </Button>);

    return (
      <Dialog
        id='dlg_edit_employee'
        visible
        onHide={this.handleCancel}
        aria-labelledby='dlg_edit_employee_area'
        fullPage
      >
        <Toolbar
          id='dlg_toolbar_edit_employee'
          colored
          nav={nav}
          actions={action}
          title='О сотруднике'
          fixed
        />
        <div className='md-toolbar-relative md-text-field-container--padded-block'>
          <TextField
            id='txt_employee_name'
            label='ФИО сотрудника'
            defaultValue={this.state.employee.name}
            ref={(field) => { this.nameField = field; }}
          />
          <SelectField
            id='txt_department_name'
            label='Подразделение'
            defaultValue={this.state.employee.department.name}
            ref={(field) => { this.departmentField = field; }}
            menuItems={this.props.departments}
            itemLabel='name'
            fullWidth
          />
          <SelectField
            id='txt_employee_group_name'
            label='Права в программе'
            defaultValue={this.state.employee.employee_group.name}
            ref={(field) => { this.employeeGroupField = field; }}
            menuItems={this.props.employee_groups}
            itemLabel='name'
            fullWidth
          />
          <TextField
            id='txt_employee_group_name'
            label='Пароль'
            defaultValue={this.state.employee.password}
            type='password'
            ref={(field) => { this.passwordField = field; }}
          />
        </div>
      </Dialog>
    );
  }
}

AddEmployeeDlg.propTypes = {
  modalType: PropTypes.string.isRequired,
};
