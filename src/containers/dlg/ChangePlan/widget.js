import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  DialogContainer,
  TextField,
  SelectField } from 'react-md';

import AWidgetDlg from '../AWidgetDlg';
import { months } from '../../../constants';

export default class ChangePlanDlg extends AWidgetDlg {
  static propTypes = {
    modalType: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      year: props.year,
      month: props.month,
    };
  }

  hide=() => this.setState({ visible: false });

  fnOk=() => {
    this.hide();
    this.props.actions.fnOk(this.state.year, this.state.month);
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      visible: nextProps.visible,
      year: nextProps.year,
      month: nextProps.month,
    });
  }

  render() {
    const actions = [];
    actions.push(<Button flat secondary onClick={this.hide}>Отмена</Button>);
    actions.push(<Button
      flat
      primary
      onClick={this.fnOk}
    >Да
                 </Button>);
    return (
      <DialogContainer
        id='dlg_confirm'
        visible={this.state.visible}
        onHide={this.hide}
        actions={actions}
        title='Выберите месяц и год'
      >
        <SelectField
          id='field-month'
          label='Месяц'
          menuItems={months}
          defaultValue={months[this.props.month - 1]}
          simplifiedMenu={false}
          onChange={(value, idx) => this.setState({ month: idx + 1 })}
        />
        <TextField
          id='txt-year'
          label='Год'
          type='number'
          defaultValue={this.props.year}
          onChange={val => this.setState({ year: val })}
        />
      </DialogContainer>
    );
  }
}

