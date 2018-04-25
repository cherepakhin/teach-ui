import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import mapDlg from './mapDlg';

/**
 * Компонета для отображения выбранного диалога
 * @param modalType
 * @param modalProps
 * @returns {*}
 * @constructor
 */
const ModalRoot = ({ modalType, modalProps }) => {
  if (!modalType) {
    return null;
  }

  const oDlg = mapDlg.get(modalType);
  const DLG = oDlg.widget;

  // Передаю actions из класса Dlg в widget DLG.
  // Раньше не могу, т.к. widget еще не создан.
  // В след. строке widget будет создан и туда через props переданы действия.
  return <DLG {...modalProps} modalType={modalType} actions={oDlg.actions} />;
};

ModalRoot.defaultProps = {
  modalType: '',
  modalProps: {},
};

ModalRoot.propTypes = {
  modalType: PropTypes.string,
  modalProps: PropTypes.shape({}),
};

const mapStateToProps = function (state) {
  return state.modal;
};

const ConnectedModalRoot = connect(mapStateToProps)(ModalRoot);
export { ModalRoot, ConnectedModalRoot };

