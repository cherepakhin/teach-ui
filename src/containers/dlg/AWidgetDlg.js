import React from 'react';
import PropTypes from 'prop-types';

/**
 * Заготовка для создания диалогов
 */
class AWidgetDlg extends React.Component {

  constructor(props) {
    super(props);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleCancel() {
    this.props.actions.fnCancel();
  }

  handleOk() {
    this.props.actions.fnOk();
    // this.props.actions.clickOk();
  }

  /**
   * Реакция на ввод Enter  и Esc
   * @param  {[type]} e [description]
   */
  handleChange(e) {
    if (e.key === 'Escape') {
      e.preventDefault();
      this.handleCancel();
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();

      // !!!!! Вызов абстрактного метода.
      // handleOk() ДОЛЖЕН БЫТЬ ОПРЕДЕЛЕН В ПОТОМКАХ
      this.handleOk();
    }
  }
}

AWidgetDlg.propTypes = {
  actions: PropTypes.shape({
    fnOk: PropTypes.func.isRequired,
    fnCancel: PropTypes.func.isRequired,
  }).isRequired,
};

AWidgetDlg.defaultProps = {
  actions: {
    fnOk() {
    },

    fnCancel() {
    },
  },
};

export default AWidgetDlg;
