import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-md/lib/Buttons';
import DialogContainer from 'react-md/lib/Dialogs';
import TextField from 'react-md/lib/TextFields';

/*
  Диалог ввода строки
  Пример использования в containers/dlg/AddQuestion

        <EditTextDlg
          fnOk={this.changeQuection}
          fnCancel={this.cancelQuection}
          txt={this.state.answer}
          visible={this.state.visibleEditDlg}
        />
*/
export default class EditTextDlg extends PureComponent {
  state = { enabledOk: false };

  componentWillReceiveProps(newProps) {
    this.setState(...this.state, { enabledOk: newProps.txt.length > 0 });
  }

  cancel = () => {
    this.props.fnCancel();
  };

  ok = () => {
    this.props.fnOk(this.inputField.value);
  };


  render() {
    const actions = [];
    actions.push({ secondary: true, children: 'Отмена', onClick: this.cancel });
    actions.push(<Button
      flat
      primary
      disabled={!this.state.enabledOk}
      onClick={this.ok}
    >Сохранить
                 </Button>);

    return (
      <DialogContainer
        id='simple-action-dialog'
        aria-describedby='edit-dlg'
        visible={this.props.visible}
        actions={actions}
        onHide={this.cancel}
      >
        <TextField
          id='dialog-field'
          label='Введитет текст'
          defaultValue={this.props.txt}
          rows={1}
          ref={(field) => { this.inputField = field; }}
          onChange={(txt) => {
            this.setState(...this.state, { enabledOk: txt.length > 0 });
          }}
        />
      </DialogContainer>
    );
  }
}

EditTextDlg.propTypes = {
  fnOk: PropTypes.func.isRequired,
  fnCancel: PropTypes.func.isRequired,
  txt: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
};
