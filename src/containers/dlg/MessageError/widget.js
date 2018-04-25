import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'react-md/lib/Dialogs';
import AWidgetDlg from '../AWidgetDlg';

/*
 Сообщение об ошибке
 */
class DlgMessageError extends AWidgetDlg {


  render() {
    return (
      <Dialog
        id='DlgMessageError'
        visible
        onHide={this.handleCancel}
        aria-labelledby='dlg_message'
        modal
        centered
        actions={[{
          onClick: this.handleCancel,
          primary: true,
          label: 'Закрыть',
        }]}
      >
        <h2 id='dlg_message' className='md-text--theme-secondary md-text-center'>{this.props.message}</h2>
      </Dialog>

    );
  }
}

DlgMessageError.propTypes = {
  message: PropTypes.string.isRequired,
};

DlgMessageError.defaultProps = {
  message: '',
};

export default DlgMessageError;

