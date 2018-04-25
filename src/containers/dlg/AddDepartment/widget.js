import React from 'react';
import PropTypes from 'prop-types';

import { Button, DialogContainer, TextField } from 'react-md';

import AWidgetDlg from '../AWidgetDlg';

export default class AddDepartmentDlg extends AWidgetDlg {
  constructor(props) {
    super(props);
    this.fnOk = this.fnOk.bind(this);
    this.hide = this.hide.bind(this);
    this.state = {
      visible: true,
    };
  }

  hide() {
    this.setState({ visible: false });
  }

  fnOk() {
    this.hide();
    // console.log(this.inputField.value);
    this.props.actions.fnOk(this.inputField.value);
  }

  render() {
    const actions = [];
    actions.push({ secondary: true, children: 'Отмена', onClick: this.hide });
    actions.push(<Button flat primary onClick={this.fnOk}>Сохранить</Button>);
    return (
      <DialogContainer
        id='simple-string-dialog'
        actions={actions}
        visible={this.state.visible}
        onHide={this.hide}
        title=''
      >
        <TextField
          id='simple-string-dialog-field'
          label='Введите название'
          ref={(field) => { this.inputField = field; }}
        />
      </DialogContainer>
    );
  }
}

AddDepartmentDlg.propTypes = {
  modalType: PropTypes.string.isRequired,
};
