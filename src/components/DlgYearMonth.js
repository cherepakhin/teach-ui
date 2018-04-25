import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  DialogContainer,
  SelectField,
  TextField,
} from 'react-md';

const month = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

class DlgYearMonth extends PureComponent {
  static propTypes = {
    ok: PropTypes.func.isRequired, // будет вызвана с параметрами year,month
    cancel: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      year: props.year,
      month: props.month,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ visible: nextProps.visible });
  }

  render() {
    const actions = [];
    actions.push(<Button flat secondary onClick={this.props.cancel}>Отмена</Button>);
    actions.push(<Button
      flat
      primary
      onClick={() => this.props.ok(this.state.year, this.state.month)}
    >Да
    </Button>);
    return (
      <DialogContainer
        id='dlg_confirm'
        visible={this.state.visible}
        onHide={this.props.cancel}
        actions={actions}
        title='Выберите месяц и год'
      >
        <SelectField
          id='field-month'
          label='Месяц'
          menuItems={month}
          defaultValue={month[this.props.month - 1]}
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

export default DlgYearMonth;
