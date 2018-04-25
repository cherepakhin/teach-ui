import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  TextField,
  DialogContainer,
} from 'react-md';

import * as InitVarActions from '../../actions/InitVarActions';

class LoginPage extends React.Component {
  state={
    visible: true,
  }

  doLogin= () => {
    this.setState({ visible: false });
    this.props.actions.login(this.nameField.value, this.passwordField.value);
  }

  render() {
    const actions = [{
      onClick: this.doLogin,
      primary: true,
      children: 'Войти',
    }];
    return (
      <DialogContainer
        id='dlg_login'
        title='Введите имя и пароль'
        aria-describedby='login_card'
        modal
        visible={this.state.visible}
        actions={actions}
      >
        <TextField
          id='txt_employee_name'
          label='ФИО'
          ref={(field) => { this.nameField = field; }}
        />
        <TextField
          id='txt_employee_group_name'
          label='Пароль'
          type='password'
          ref={(field) => { this.passwordField = field; }}
        />
      </DialogContainer>
    );
  }
}

const mapStateToProps = function (state) {
  return { ...state.app };
};

const mapDispatchToProps = function (dispatch) {
  return {
    actions: bindActionCreators(InitVarActions, dispatch),
  };
};


LoginPage.propTypes = {
  actions: PropTypes.shape({
    login: PropTypes.func.isRequired,
  }).isRequired,
  login: PropTypes.shape({
    n: PropTypes.number.isRequired,
    txt: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(PropTypes.shape({
      n: PropTypes.number.isRequired,
      txt: PropTypes.string.isRequired,
    })),
  }).isRequired,
};

const ConnectedLoginPage = connect(mapStateToProps, mapDispatchToProps)(LoginPage);
export { LoginPage, ConnectedLoginPage };
