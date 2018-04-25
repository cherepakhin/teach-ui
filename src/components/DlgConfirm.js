import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  DialogContainer,
} from 'react-md';

class DlgConfirm extends PureComponent {
  static propTypes = {
    ok: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
  };

  state={
    visible: false,
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ visible: nextProps.visible });
  }

  render() {
    const actions = [];
    actions.push(<Button flat secondary onClick={this.props.cancel}>Отмена</Button>);
    actions.push(<Button flat primary onClick={() => this.props.ok()}>Да</Button>);
    return (
      <DialogContainer
        id='dlg_confirm'
        visible={this.state.visible}
        onHide={this.props.cancel}
        actions={actions}
        title={this.props.title}
      />
    );
  }
}

export default DlgConfirm;
